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


## Project: Audits Tool.

### Live App: https://hcoco1.github.io/todo-list-local-storage/

### Project Pitch:

Audits Tool is a React-based solution designed to streamline the process of storing and managing audit data in a user-friendly manner. It allows users to input audit details such as usernames, process paths, and durable items, which are then saved locally and can be viewed or deleted. Additionally, the app offers a feature to generate and download comprehensive audit reports, enhancing the efficiency of audit compilation and review.

### Description:

In the bustling world of logistics and operations, managing audits can often feel like navigating through a labyrinth. The complexity of tracking numerous processes, ensuring compliance, and maintaining records can be overwhelming. This was the challenge I faced in my job, where compiling audits became a task that consumed excessive time and energy, detracting from the efficiency and productivity of our operations. The need for a solution was clear: a tool that could streamline the audit process, making it more manageable and accessible. This led me to create a simple yet powerful application designed to store and display audits in a user-friendly manner.

The core idea was to develop an app that simplifies the process of adding and managing audit data and provides a seamless way to generate reports. Leveraging the power of React, a popular JavaScript library for building user interfaces, I set out to create this application. The goal was to make an intuitive app for users, allowing them to input and retrieve audit information easily.

The application's structure is straightforward. It utilizes React's useState hook to manage the state of audits (or "todos" in the context of the code), storing them locally in the browser's localStorage. This ensures that the data persists even after the browser is closed, providing a persistent storage solution without needing a backend database.

Users can add new audits through a simple form, inputting details such as the username, process path, and whether the process is durable. The form is designed to be intuitive, with placeholders and dropdown menus guiding the user through the data entry process. The audit is added to the list upon submission, and the form is reset and ready for the next entry.

One of the critical features of this app is its ability to capitalize the first letter of specific inputs automatically, ensuring consistency and readability in the data stored. This small but significant detail enhances the user experience by reducing the need for manual text formatting.

The application also includes functionality to delete individual audits, allowing users to manage their records easily. This feature ensures that the audit list remains relevant and up-to-date, reflecting the current state of operations.

The most powerful feature of the app is its report-generation capability. Users can compile the audits into a downloadable text file with a single click. The report-generation capability makes sharing audit reports with stakeholders incredibly easy, providing a clear and concise overview of the audits conducted.

In conclusion, the development of this audit management application was driven by the need to simplify the complex process of handling audits. By leveraging React and modern web technologies, I created a tool that not only meets this need but also enhances the overall efficiency of audit management. This app stands as a testament to the power of technology in solving practical problems, making the daunting task of audit compilation a thing of the past.
