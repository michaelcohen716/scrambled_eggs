require 'xcodeproj'
require 'find'
require 'yaml'

class XCodeProject
  def initialize(path)
    unless File.exists?(path)
      raise Errno::ENOENT, "#{path} does not exist."
    end

    @path = path
    @_name = File.basename(path, '.xcodeproj')

    @proj = Xcodeproj::Project.open(path)

    @build_config_names = @proj.build_configurations.collect(&:name).to_set

    @debug_bc = build_config_named 'Debug'
    @release_bc = build_config_named 'Release'
  end

  def project_name
    @_name
  end

  def deep_dup(object)
    case object
    when Hash
      new_hash = {}
      object.each do |key, value|
        new_hash[key] = deep_dup(value)
      end
      new_hash
    when Array
      object.map { |value| deep_dup(value) }
    else
      object.dup
    end
  end

  def build_configurations
    @proj.build_configurations
  end

  def mirror_settings(from_bc, to_bc)
    to_bc.build_settings = deep_dup(from_bc.build_settings)
  end

  def duplicate_debug_as(name)
    bc = @proj.add_build_configuration(name, :debug)
    mirror_settings(@debug_bc, bc)
  end

  def duplicate_release_as(name)
    bc = @proj.add_build_configuration(name, :release)
    mirror_settings(@release_bc, bc)
  end

  def ensure_build_config(name, kind)
    base_bc = kind == :debug ? @debug_bc : @release_bc

    if has_config_named name
      puts "    Configuration '#{name}' already exists."
      puts "      Ensuring settings are properly mirrored."
      mirror_settings(base_bc, build_config_named(name))
    else
      puts "    Not Found: '#{name}'."
      puts "      Creating new one based off of #{base_bc.name}."
      if kind == :debug
        duplicate_debug_as(name)
      else
        duplicate_release_as(name)
      end
    end
  end

  def build_config_named(name)
    @proj.build_configurations.find { |bc| bc.name == name }
  end

  def all_build_phases
    @proj.targets.map{|t|t.build_phases}.flatten
  end

  def has_config_named(name)
    @build_config_names.include?(name)
  end

  def find_run_script_phase
    all_build_phases.find do |bp|
      bp.is_a?(Xcodeproj::Project::Object::PBXShellScriptBuildPhase) && yield(bp)
    end
  end

  def save
    @proj.save
  end
end


class BuildConfigSynchronizer
  def initialize(search_path=File.join(File.dirname(__FILE__), '../node_modules'))
    @search_path = search_path
    load_config
    find_and_fix_projects
  end

  def load_config(config_path=File.join(File.dirname(__FILE__), './build-config-mappings.yml'))
    puts "Loading mappings from: #{config_path}..."
    unless File.exists?(config_path)
      raise Errno::ENOENT, "You need to make a yaml file."
    end
    @mappings = YAML.load_file(config_path)
    puts "Config loaded."

    all_names = @mappings.map{|k,n|n}.flatten
    max_name_len = all_names.map{|n|n.length}.max

    @mappings.each do |kind,names|
      names.each do |name|
        puts "  #{name.ljust(max_name_len + 1)}=> #{kind}"
      end
      puts "\n"
    end
    puts "\n"
  end

  def fix_react_project(project)
    puts "Fixing #{project.project_name}..."

    puts "  Ensuring all build configs are properly mapped"
    @mappings.each do |kind,names|
      names.each do |name|
        project.ensure_build_config(name, kind)
      end
    end

    puts "  Making sure run scripts have correct conditionals."
    bp = project.find_run_script_phase do |rs_phase|
      rs_phase.shell_script.include?('"Debug"')
    end

    if bp
      puts "  Run script needs updating."
      ss_text = bp.shell_script.split("\n").map{|s| "    #{s}"}.join("\n")
      puts "  Found:\n#{ss_text}\n"
      bp.shell_script = bp.shell_script.sub('"Debug"', '*Debug')
      ss_text = bp.shell_script.split("\n").map{|s| "    #{s}"}.join("\n")
      puts "  Replaced with:\n#{ss_text}\n"
    else
      puts "  Run script seems in order."
    end

    puts "Finished fixing #{project.project_name}.\n\n"

    project.save
  end

  def fix_react_websocket_project(project)
    puts "Fixing #{project.project_name}..."
    puts "  Ensuring all build configs are properly mapped"
    @mappings.each do |kind,names|
      names.each do |name|
        project.ensure_build_config(name, kind)

        # For some reason, these settings aren't duplicated.
        # buildSettings = {
        #   EXECUTABLE_PREFIX = lib;
        #   GCC_TREAT_WARNINGS_AS_ERRORS = NO;
        #   HEADER_SEARCH_PATHS = (
        #     "$(inherited)",
        #     /Applications/Xcode.app/Contents/Developer/Toolchains/XcodeDefault.xctoolchain/usr/include,
        #     "$(SRCROOT)/../../React/**",
        #     "$(SRCROOT)/../SRWebSocket/",
        #   );
        #   OTHER_LDFLAGS = "-ObjC";
        #   PRODUCT_NAME = "$(TARGET_NAME)";
        #   SKIP_INSTALL = YES;
        # };
        # name = "Production Debug";
        #
        # Manually copy them over.
        bc = project.build_config_named name
        bc.build_settings['EXECUTABLE_PREFIX'] = 'lib'
        bc.build_settings['GCC_TREAT_WARNINGS_AS_ERRORS'] = 'NO'
        bc.build_settings['HEADER_SEARCH_PATHS'] = [
            '"$(inherited)"',
            '/Applications/Xcode.app/Contents/Developer/Toolchains/XcodeDefault.xctoolchain/usr/include',
            '"$(SRCROOT)/../../React/**"',
            '"$(SRCROOT)/../SRWebSocket/"',
        ]
        bc.build_settings['OTHER_LDFLAGS'] = '"-ObjC"'
        bc.build_settings['PRODUCT_NAME'] = '"$(TARGET_NAME)"'
        bc.build_settings['SKIP_INSTALL'] = "YES"
      end
    end


    puts "Finished fixing #{project.project_name}.\n\n"

    project.save
  end

  def fix_crashlytics_project(project)
    puts "Fixing #{project.project_name}..."

    new_search_path = '$(SRCROOT)/../../../ios/Pods/Headers/Public/Crashlytics'
    project.build_configurations.each do |bc|
      search_paths = bc.build_settings['HEADER_SEARCH_PATHS']
      unless search_paths.include?(new_search_path)
        search_paths << new_search_path
        bc.build_settings['HEADER_SEARCH_PATHS'] = search_paths
      end
    end
    puts "Finished fixing #{project.project_name}.\n\n"

    project.save
  end

  def find_and_fix_projects
    puts "Searching #{@search_path} for relevant xcodeproj's...\n\n"
    found = 0
    need_to_find = 3
    Find.find(@search_path) do |e|
      if e =~ /React\.xcodeproj\Z/
        puts "Found React's main xcodeproj file. #{e}"
        fix_react_project(XCodeProject.new(e))
        found += 1
        if found == need_to_find
          return
        end
        Find.prune
      elsif e =~ /RCTWebSocket\.xcodeproj\Z/
        puts "Found React's WebSocket xcodeproj file. #{e}"
        fix_react_websocket_project(XCodeProject.new(e))
        found += 1
        if found == need_to_find
          return
        end
        Find.prune
      elsif e =~ /SMXCrashlytics\.xcodeproj\Z/
        puts "Found SMXCrashlytics's xcodeproj file. #{e}"
        fix_crashlytics_project(XCodeProject.new(e))
        found += 1
        if found == need_to_find
          return
        end
        Find.prune
      end
    end
  end
end


BuildConfigSynchronizer.new
