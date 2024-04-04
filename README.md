<div align="center"><h1>Ivan Arias. Full-Stack Developer.</h1></div>

<div id="badges" align="center">
  <a href="https://www.linkedin.com/in/arias-ivan-hcoco1/">
    <img src="https://img.shields.io/badge/LinkedIn-blue?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn Badge"/>
  </a>
  <a href="https://www.youtube.com/channel/UCban0ilP3jBC9rdmL-fPy_Q">
    <img src="https://img.shields.io/badge/YouTube-red?style=for-the-badge&logo=youtube&logoColor=white" alt="Youtube Badge"/>
  </a>
  <a href="https://twitter.com/hcoco1">
    <img src="https://img.shields.io/badge/Twitter-blue?style=for-the-badge&logo=twitter&logoColor=white" alt="Twitter Badge"/>
  </a>
</div>  


## Project: Audits Tool 🔧

### <a href="https://audits.hcoco1.com/" target="_blank">Live App</a> 

### <a href="https://www.hcoco1.com/blog/2024-03-13-audits-tool" target="_blank">Blog Post</a> 

>The Audits Tool is a React-based application designed to enhance the efficiency of audit data management. It offers a user-friendly interface for storing and managing audit details, such as usernames, process paths, and audit descriptions. This information is saved ina Firebase database and can be easily viewed or deleted as needed. Additionally, the tool features functionality to generate and download comprehensive audit reports, streamlining the audit compilation and review process.

---

![alt text](https://github.com/hcoco1/todo-list-local-storage/blob/main/audit_tool.png?raw=true)

---

---

![alt text](https://github.com/hcoco1/todo-list-local-storage/blob/main/audit_tool_1.png?raw=true)

---

# Core Functionalities (AI-Generated 🤖)

## State Management with React Hooks

### useState Hook

- Utilized for initializing and managing the component's state, enabling tracking of the todos list, new todo input fields, auditor's name, and the editing state of the auditor's name.
- Facilitates local state management within functional components, essential for dynamically handling user inputs and application data.

### State Initialization

- Initial state values for todos and auditor's name are derived from `localStorage`, showcasing a pattern for initializing state with data from external sources.
- A function passed to `useState` fetches and parses data from `localStorage`, ensuring state synchronization with persisted data.

## Side Effects with useEffect Hook

### useEffect Hook

- Manages side effects, especially for persisting state changes to `localStorage`. Separate effects are defined for `todos` and `auditorName`, demonstrating controlled effect execution through the dependency array.


## Component Composition and Reusability

### Child Components

- Integrates reusable child components (`TodoForm`, `TodoList`, `Footer`, `ReportGenerator`, and `AuditorNameForm`), highlighting React's component composition model for a modular and maintainable codebase.

### Props and Callbacks

- Interaction between `App` and child components is facilitated through props, including function props for adding, deleting, and editing todos, promoting a unidirectional data flow and decoupled parent-child communication.

## Event Handling and State Updates

### Form Submission

- Processes new todo additions and auditor name submissions via form submission handlers, preventing default form behavior and updating the state with new data.

### Editing and Deleting Todos

- Implements editing and deleting todos through state updates that manipulate the todos array, adhering to the immutability principle for efficient UI re-rendering.

## Localization and Date Handling

### Date Formatting

- Formats the current date and time to Eastern Time using `toLocaleString` when adding a new todo, addressing date handling and localization within React applications.

## Deployment and Custom Domain Configuration

GitHub Pages: Utilized for its simplicity in deploying static sites directly from a GitHub repository, offering a streamlined workflow for pushing updates and managing releases.

Custom Subdomain Configuration: Involves setting a CNAME record in GoDaddy’s DNS settings to point the chosen subdomain (audits.hcoco1.com) to the GitHub Pages URL. This process exemplifies domain management and the integration of external DNS services with GitHub-hosted projects.


