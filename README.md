# mdnkit 🚀

> **AI-Powered Legacy Application Modernization Toolkit for IBM Bob**

Transform your legacy web applications into modern, cloud-ready architectures with intelligent analysis, comprehensive planning, and automated implementation through Bob Skills.

---

## 📋 Overview

**mdnkit** (Modernization Kit) is an intelligent modernization toolkit designed to work seamlessly with IBM Bob, helping teams systematically transform legacy web applications into modern architectures. It analyzes your existing codebase, generates detailed modernization blueprints, designs new architectures based on your preferred tech stack, and creates Bob Skills markdown files that guide IBM Bob through the implementation process.

### What is mdnkit?

mdnkit is an npm package that can be installed globally and used to kickstart your legacy application modernization journey. Similar to tools like GitHub Spec Kit, mdnkit provides a streamlined workflow:

1. **Install globally** via npm: `npm install -g mdnkit`
2. **Initialize** in your desired folder with the `init` command and `--source-path` argument
3. **Analyze** your legacy application automatically
4. **Generate** Bob Skills markdown files in `.bob/skills/` directory
5. **Let IBM Bob** implement the modernization based on the generated skills

The key innovation of mdnkit is its ability to translate complex modernization requirements into structured Bob Skills files that IBM Bob can understand and execute, creating a seamless AI-driven modernization pipeline.

### The Challenge

Legacy web applications built with PHP, JSP, ASP.NET, and older JavaScript frameworks often suffer from:
- Outdated technology stacks that are difficult to maintain
- Monolithic architectures that don't scale
- Security vulnerabilities and technical debt
- Lack of modern development practices
- Difficulty attracting and retaining developers

### The Solution

mdnkit bridges the gap between legacy and modern by:
1. **Analyzing** your legacy codebase comprehensively
2. **Documenting** the current architecture and dependencies
3. **Designing** a modern architecture tailored to your needs
4. **Planning** the migration with detailed implementation steps
5. **Generating** Bob Skills markdown files that guide IBM Bob
6. **Enabling** automated, AI-driven modernization through structured skills

---

## ✨ Key Features

- 🔍 **Deep Codebase Analysis** - Comprehensive scanning of legacy application structure, dependencies, and technical debt
- 🤖 **Executable Bob Skills** - Generates 5 executable skills that Bob can invoke to perform modernization tasks
- 🏗️ **Flexible Architecture Design** - User-configurable target tech stacks for modern frameworks and cloud-native patterns
- 📝 **Intelligent Planning** - Phased migration strategies with trackable tasks and checkboxes
- 🎯 **Task Breakdown Engine** - Granular task decomposition with clear acceptance criteria
- 🔄 **Iterative Migration** - Step-by-step migration with testing and validation at each stage
- 📊 **Project-Specific Skills** - Skills customized with actual project data, not generic templates

---

## 🚀 Getting Started

### Prerequisites

- IBM Bob installed and configured
- Access to legacy application codebase
- Node.js 18+ (for running mdnkit)
- npm or yarn package manager

### Installation

mdnkit is distributed as an npm package that can be installed globally:

```bash
# Install mdnkit globally via npm
npm install -g mdnkit

# Or using yarn
yarn global add mdnkit

# Verify installation
mdnkit --version
```

### Basic Usage

The workflow is simple - install globally, then use the `init` command in your desired folder:

#### 1. Initialize mdnkit in your project directory

```bash
# Navigate to where you want to create the modernization project
cd /path/to/your/workspace

# Initialize with source path to your legacy application
mdnkit init --source-path "/path/to/legacy/app"
```

This command will:
- **Copy** the legacy application to `legacy-apps/` in your workspace (for safe reference)
- Analyze the copied codebase
- Create a `.bob/skills/` directory structure
- Generate **5 executable Bob Skills** for modernization

**Note**: By default, mdnkit copies external codebases to your workspace to preserve a snapshot for reference. This ensures the analysis remains consistent even if the original source changes.

#### Skip copying (use original path)

If you want to analyze without copying:

```bash
# Use --no-copy flag to skip copying
mdnkit init --source-path "/path/to/legacy/app" --no-copy
```

Sources already in your workspace are automatically detected and not copied:

```bash
# This won't be copied (already in workspace)
mdnkit init --source-path "./examples/my-legacy-app"
```

#### 2. Review the generated Bob Skills files

```bash
# The following executable skills are created in .bob/skills/:
.bob/skills/
├── mdnkit-analysis/SKILL.md      # Analyze legacy codebase
├── mdnkit-architecture/SKILL.md  # Design modern architecture
├── mdnkit-plan/SKILL.md          # Create implementation plan
├── mdnkit-migrate/SKILL.md       # Execute migration tasks
└── mdnkit-test/SKILL.md          # Generate tests
```

#### 3. Use Bob to execute the modernization

Once the Bob Skills are generated, you can invoke them with IBM Bob:

```markdown
# Step 1: Analyze the legacy application
Bob, use mdnkit-analysis to analyze the legacy application

# Step 2: Design modern architecture
Bob, use mdnkit-architecture to design a React + Express 5 architecture

# Step 3: Create implementation plan
Bob, use mdnkit-plan to create a detailed migration plan

# Step 4: Execute migration tasks (iterative)
Bob, use mdnkit-migrate to implement task 1.1 from the plan
Bob, use mdnkit-migrate to implement task 1.2 from the plan

# Step 5: Generate tests
Bob, use mdnkit-test to generate tests for the migrated code
```

**See [Skill Usage Guide](docs/SKILL_USAGE_GUIDE.md) for detailed invocation patterns and examples.**

---

## 📖 Useful Commands

### Copy behavior options

```bash
# Default: Copy external codebases to workspace
mdnkit init --source-path "/external/path/to/app"
# → Copies to ./legacy-apps/<project-name>/

# Skip copying (use original path)
mdnkit init --source-path "/external/path/to/app" --no-copy
# → Analyzes from original location

# Workspace sources are never copied
mdnkit init --source-path "./examples/my-app"
# → Uses original path (already in workspace)
```

### Verbose output

```bash
# See detailed information about the copy process
mdnkit init --source-path "/path/to/app" --verbose
```

### Customize output directory

```bash
# Specify custom output directory for Bob Skills
mdnkit init --source-path "/path/to/app" --output-dir "./custom-skills"
```

---

## 📚 Documentation

For detailed technical information, architecture details, and implementation guidelines, see:

- **[Technical Reference](TECHNICAL_REFERENCE.md)** - Detailed workflow, phase descriptions, Bob Skills structure, configuration options, and use cases
- **[GitHub Issues](https://github.com/your-org/modernize-kit/issues)** - Report bugs or request features
- **[GitHub Discussions](https://github.com/your-org/modernize-kit/discussions)** - Ask questions and share ideas

---

## 🤝 Contributing

We welcome contributions to mdnkit! Whether it's bug reports, feature requests, or code contributions, please feel free to get involved.

### How to Contribute

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Setup

```bash
# Clone your fork
git clone https://github.com/your-username/modernize-kit.git

# Install dependencies
npm install

# Run tests
npm test

# Run in development mode
npm run dev
```

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- IBM Bob team for the amazing AI coding assistant
- The open-source community for inspiration and tools
- All contributors who help make legacy modernization easier

---

## 📞 Support & Contact

- **Issues**: [GitHub Issues](https://github.com/your-org/modernize-kit/issues)
- **Discussions**: [GitHub Discussions](https://github.com/your-org/modernize-kit/discussions)

---

<div align="center">

**Made with ❤️ for developers modernizing legacy applications**

[Get Started](#-getting-started) • [Technical Reference](TECHNICAL_REFERENCE.md) • [Contributing](#-contributing)

</div>
