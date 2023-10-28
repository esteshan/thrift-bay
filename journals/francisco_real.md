### Journal Entry - 09/24/2023 1

---

#### Task:

Set up a Dockerized Project with PostgreSQL

#### Objective:

The aim was to create a multi-container environment with Docker to manage the FastAPI backend, Node.js frontend, and PostgreSQL database services. This is done using `docker-compose` to orchestrate the different containers.

---

#### Steps Taken:

1. **Define Services in `docker-compose.yml`**: Updated the `docker-compose.yml` file to specify how Docker should build and manage our services.

2. **Setup Environment Variables**: Specified necessary environment variables for FastAPI and PostgreSQL to connect and authenticate.

3. **Port Forwarding**: Defined port mappings to expose our FastAPI and PostgreSQL services.

4. **Volumes**: Used Docker volumes to persist data and enable code changes without rebuilding the container.

5. **Testing**: Ran `docker-compose up` to start all services and tested by hitting the FastAPI and Node.js endpoints. Also connected to the PostgreSQL database using Beekeeper Studio.

---

#### Key Code Snippets:

The `docker-compose.yml` was a crucial part of this task. The configurations for the FastAPI, Node.js, and PostgreSQL services were defined here.

---

#### Challenges:

- **Database Connection**: Ensuring that the FastAPI service connects to the PostgreSQL database required precise environment variables.

- **External Volumes**: Initially, an issue arose with the `external: true` flag for volumes, which was solved by removing it for the first run.

---

#### Solutions:

- **Database Connection**: Checked FastAPI logs to verify a successful database connection.

- **External Volumes**: Removed the `external: true` flag for the first run to auto-create the volume.

---

#### Lessons Learned:

- Understanding Docker's role in creating isolated environments for each service (FastAPI, Node.js, PostgreSQL).

- Grasped the importance of `docker-compose` in managing multi-container applications.

- Learned how to debug issues using Docker logs and how to connect to a Dockerized PostgreSQL database using Beekeeper Studio.

---
## Journal Entry - 09/24/2023 2
---
### Task

Create GitLab Issues for Agile Sprint 1 and Initial Project Setup

### Objective

The goal was to establish the foundations for our team project, which includes setting up Docker with FastAPI and Node.js, as well as defining the initial set of tasks (issues) for our first Agile sprint in GitLab.

---

### Steps Taken

1. **Research and Planning**:
   Reviewed the project requirements and decided on the tech stack which includes FastAPI, Node.js, React, and PostgreSQL.

2. **Docker Setup**:
   Utilized a pre-existing Docker configuration that included FastAPI and Node.js services to kickstart the project.

3. **Dependency Management**:
   Reviewed and selected the necessary Python and JavaScript packages that the project will need.

4. **GitLab Issues**:
   Created detailed issues in GitLab based on Agile user stories, complete with descriptions, acceptance criteria, and definitions of done for tasks like setting up endpoints and creating specific pages.

5. **Issue Labeling**:
   Assigned appropriate labels to each issue to make sprint planning and task assignment easier.

---

### Key Code Snippets

No code snippets were directly worked on, but the initial set of `docker-compose.yml` and `requirements.txt` files were critically reviewed.

---

### Challenges

- **Task Granularity**:
  Determining the level of detail needed in each GitLab issue without making them too broad or too narrow.

- **Prioritization**:
  Deciding which issues are the most critical for Sprint 1 and should, therefore, be prioritized.

---

### Solutions

- **Task Granularity**:
  Adopted a middle-ground approach, providing enough detail in each issue so that the scope is clear but not so much that it becomes restrictive.

- **Prioritization**:
  Used labels and consulted with the team to agree on which tasks are most urgent and should be tackled first.

---

### Lessons Learned

- Gained a better understanding of Agile methodologies and how to translate requirements into actionable tasks.
- Learned the importance of thorough planning in ensuring a smoother development cycle.
- Understood the value of clear, detailed issues in a project management tool like GitLab for team collaboration and progress tracking.

---

## Journal Entry - 09/25/2023

### Task:
- Set up issues for the team to use agile development and keep us on track.

### Objective:
The primary objective was to organize and streamline the development workflow for our team. By creating detailed issues in GitLab, the aim was to ensure everyone has a clear understanding of their responsibilities and deadlines, thereby fostering effective Agile development.

### Steps Taken:
1. **Review of Project Scope**: Initially went through the project specifications and features that need to be developed during the Agile sprint.
2. **Creation of Epics and Issues**: Utilized GitLab to create epics for large features and broke them down into smaller, manageable issues.
3. **Detailing Issues**: Added descriptions, acceptance criteria, and definitions of 'done' for each issue to provide a complete context for team members.
4. **Issue Labeling**: Assigned labels like 'Front-end', 'Back-end', 'Critical', etc., to categorize and prioritize the issues effectively.
5. **Sprint Planning**: Incorporated these issues into our Sprint planning meeting to ensure that everyone is aligned with the goals and objectives.

### Key Code Snippets:
No code was directly involved, but the GitLab issue descriptions and acceptance criteria served as the framework for the team's activities.

### Challenges:
- **Issue Clarity**: Making sure that each issue was clear and detailed enough for team members to understand without making them overwhelmingly complex.
- **Team Alignment**: Ensuring that the entire team is on the same page regarding priorities and responsibilities.

### Solutions:
- **Issue Clarity**: Conducted a brief review session with the team to clarify any ambiguities in the issues created.
- **Team Alignment**: Utilized GitLab's "@mention" feature to involve team members in issue discussions, ensuring everyone is aligned.

### Lessons Learned:
- Understood the value of meticulous planning in Agile development and how it significantly improves team efficiency.
- Learned that clear and detailed issues are vital in eliminating misunderstandings and enhancing productivity.

---

## Journal Entry - 09/27/2023

### Task:
- Implement JWT authentication into the ThriftBay project.

### Objective:
The objective was to integrate JWT authentication to secure the API endpoints of our ThriftBay project. This involves researching the best practices for JWT, making the necessary code changes, and rigorously testing the implementation.

### Steps Taken:
1. **Initial Research**: Started by researching JWT and how it can be implemented in our tech stack. Looked at libraries and methods that suit our project’s architecture.
2. **Issue Management**: Opened a new issue #28 for updating project requirements, necessary for JWT implementation.
3. **Branch Management**: Created and deleted multiple branches (19-implement-jwt-authentication, 28-update-requirements) to cleanly manage the changes.
4. **Code Implementation**: Made multiple pushes to the branch 19-implement-jwt-authentication, iteratively improving the JWT implementation.
5. **Merge Requests**: Opened and accepted merge requests to incorporate the changes into the main branch.
6. **Testing and Debugging**: Constantly pushed updates to test the implementation and fix bugs as they were identified.
7. **Closing Issues**: Successfully closed issue #8 after the merge.

### Challenges:
- **Branch Management**: Initially had to create and delete branches to maintain a clean history.
- **Secure Implementation**: Ensuring the secure implementation of JWT to prevent vulnerabilities.

### Solutions:
- **Branch Management**: Utilized Git best practices to manage branches effectively.
- **Secure Implementation**: Followed security guidelines and did extensive testing to ensure the JWT implementation is secure.

### Lessons Learned:
- Gained practical experience in implementing JWT, which is critical for API security.
- Improved skills in Git and issue management, focusing on how to effectively handle branches and merge requests.
- Enhanced understanding of the importance of secure coding practices and rigorous testing when it comes to authentication features.

---

## Journal Entry - 09/28/2023

### Task:
- Continue the implementation and rigorous testing of JWT authentication in the ThriftBay project.

### Objective:
To finalize the JWT authentication mechanism and make sure it is functioning as intended, secure, and free of bugs. This involves heavy testing and issue management.

### Steps Taken:
1. **Continuation on Branch**: Continued working on the existing branch `19-implement-jwt-authentication` to further improve the JWT implementation.
2. **Branch Deletion**: Deleted old branches to clean up the Git history.
3. **Testing**: Created a new branch named `test_auth` to isolate testing activities.
4. **Further Refinements**: Created, deleted, and pushed to several other branches (such as `19-implement-jwt-authentication-using-jwtdown-for-fastapi` and `19-implement-jwt-`) for more specific JWT features or alternative implementations.
5. **Merge Request**: Opened a new merge request `!17` to propose changes to the main branch.
6. **Issue Closing**: Closed multiple issues (`#4, #5, #6, #11, #12, and #23`) as they were resolved.
7. **Next Steps**: Created a new branch `27-update-a-product` to presumably work on the next feature after finalizing JWT authentication.

### Key Code Snippets:
Extensive testing was conducted to ensure the secure functioning of JWT authentication, although specific code snippets are not provided here.

### Challenges:
- **Managing Multiple Branches**: It was challenging to keep track of and manage several different branches that were created and deleted during this phase.
- **Rigorous Testing**: Ensuring that the JWT authentication was foolproof required detailed testing procedures.

### Solutions:
- **Managing Multiple Branches**: Kept a disciplined approach to branching by adhering to Git best practices, and cleaning up old or unnecessary branches.
- **Rigorous Testing**: Followed comprehensive testing guidelines, possibly using unit tests and integration tests, to ensure that the JWT mechanism is both secure and functional.

### Lessons Learned:
- Improved understanding of JWT authentication mechanisms, specifically in a Python FastAPI environment.
- Honed Git skills, particularly in branch and issue management, which will be invaluable in any software engineering role.
- Realized the importance of rigorous testing in authentication mechanisms to ensure both functionality and security.

---

## Journal Entry - Date: Sep 29, 2023

### Task:
- Work on multiple tasks, ranging from feature development to code cleanup, and manage the issue backlog to keep the team focused and organized.

### Objective:
To contribute to various aspects of the ThriftBay project and ensure that the team has a clear direction by organizing issues and creating corresponding branches.

### Steps Taken:
1. **Feature Development**: Continued work on the `27-update-a-product` branch, followed by opening a merge request `(!24)` and deleting the branch.
2. **Code Clean-Up**: Opened issue `#42` and created a corresponding branch `42-code-clean-up` to focus on improving code quality. Opened a merge request `(!26)`.
3. **Issue Management**: Opened multiple issues (`#43, #44, #45, #46, #47, #48, #49, #50`) to clearly define the tasks and goals for the team.
4. **Additional Branches**: Created multiple new branches (`50-set-up-react, 51-dockerfile-improvements, 51-dockerfile-dev-improvements`) corresponding to new and existing issues.
5. **Merge Requests**: Opened another merge request `(!27)`, presumably to propose changes for one of the newly created branches.
6. **Continued Work**: Ended the day by pushing to the `19` branch, possibly a continuation of previous work.

### Challenges:
- **Multi-Tasking**: Managing various tasks simultaneously, from feature development to issue management.
- **Team Organization**: Keeping the team focused by setting clear tasks and goals through issues.

### Solutions:
- **Multi-Tasking**: Maintained a structured approach to tasks by promptly opening, working on, and closing branches and merge requests.
- **Team Organization**: Opened multiple issues to break down the project into smaller, manageable tasks, making it easier for the team to focus and contribute.

### Lessons Learned:
- Mastered the art of multi-tasking in a software development environment.
- Gained invaluable experience in project and team management, specifically how to keep a development team organized and focused.



---

## Journal Entry - Date: Oct 9, 2023

### Task:
- Focus on setting up React and its dependencies in the ThriftBay project.

### Objective:
To initialize the React part of the project, making sure all the necessary dependencies are included for future development.

### Steps Taken:
1. **Merging & Issue Closing**: Started off by accepting a merge request `(!28)`, closing an issue `(#34)`, and pushing these changes to the main branch.
2. **Branch Cleanup**: Deleted several older branches (`50-set-up-react-folders, 51-dockerfile-improvements, 51-dockerfile-dev-improvements`), and also closed a merge request `(!27)`.
3. **React Setup**: Created a new branch specifically for setting up React (`50-set-up-react`).
4. **Adding Dependencies**: Made multiple pushes to the `50-set-up-react` branch, likely adding and configuring various dependencies for React.

### Challenges:
- **Project Cleanup**: Needing to remove old branches and finalize previous tasks before focusing on new objectives.
- **Environment Setup**: Initializing a new tech stack (React) and making sure all dependencies are correctly installed.

### Solutions:
- **Project Cleanup**: Successfully deleted outdated branches and closed unnecessary merge requests to declutter the project space.
- **Environment Setup**: Created a dedicated branch for setting up React and presumably started adding dependencies, thereby ensuring the project is ready for front-end development.

### Lessons Learned:
- Improved skills in managing branches and merge requests, contributing to a cleaner and more efficient project environment.
- Gained experience in setting up a new technology stack within an existing project, which is a crucial skill when contributing to scalable applications.

---

## Journal Entry - Date: Oct 10, 2023

### Task:
- Finalize the setup for React and its dependencies.
- Start working on the front page of the ThriftBay project.

### Objective:
To complete the setup process for React in the project and begin implementing the home page to provide a user interface.

(Continue with other sections similar to the previous entry...)

---

## Journal Entry - Date: Oct 18, 2023

### Task:
- Finish implementing the homepage.
- Start working on the Navbar for better site navigation.

### Objective:
To complete the homepage and add a functional and visually pleasing Navbar to enhance user experience.

### Steps Taken:
1. **Homepage Completion**: Continued pushing to the `45-implement-homepage` branch, ultimately opening and likely merging a related merge request `(!47)`. The branch was then deleted, indicating the task was likely completed.
2. **Bug Identification & Fixing**: Opened a new issue `(#65)` and created two branches `65-product-bug` and `65-product-navigation-bug` to handle it. Submitted merge requests `(!48 and !49)` and closed one of them `(!48)`, implying either the issue was resolved or another approach was decided upon.
3. **Navbar Styling**: Opened another issue `(#66)` specifically for Navbar styling. A new branch `66-navbar-styling` was created and multiple pushes were made to this branch throughout the day, indicating active development.
4. **Merge & Cleanup**: Opened a new merge request `(!51)` for the Navbar and deleted the `66-navbar-styling` branch.

### Challenges:
- **Multiple Focus Areas**: The day involved multiple areas of focus – finishing the homepage, bug-fixing, and Navbar styling.
- **Quality Assurance**: Bugs were identified, requiring attention in the midst of other development tasks.

### Solutions:
- **Time Management**: Effectively juggled between different tasks, ensuring that each was given the attention it required.
- **Methodical Debugging**: Opened specific branches for issues, providing a focused environment for debugging and feature enhancement.

### Lessons Learned:
- Refined skills in task-switching, managing to work on bug fixes while also focusing on feature development.
- Gained more experience in UI/UX design through the implementation of the homepage and Navbar styling.

---

## Journal Entry - Date: Oct 19, 2023

### Task:
- Write unit tests for the categories feature in the ThriftBay application.

### Objective:
To ensure that the categories feature works as expected by writing and running unit tests.

### Steps Taken:
1. **New Branch Creation**: Created a new branch specifically for this task `56-unittest-categories`.
2. **Code Development**: Made multiple pushes to the branch `56-unittest-categories`,
3. **Merge Request and Issue Closure**: Accepted merge request `!52` and closed issue `#68`, indicating that the unit tests were likely successful and the task was completed.
4. **Main Branch Update**: Pushed the changes to the main branch, making the successful unit tests part of the main codebase.
5. **Cleanup**: Deleted the branch `56-unittest-categories` post-merging, adhering to best practices of branch management.

### Challenges:
- **Quality Assurance**: Writing unit tests can be challenging as they must cover all edge cases and potential bugs.

### Solutions:
- **Methodical Testing**: The timeline suggests methodical work on writing and likely testing the unit tests, with multiple pushes made to the branch.

### Lessons Learned:
- **Testing Skills**: Gained experience in writing unit tests, an essential skill for ensuring code quality and functionality.
- **Pytest**: Improved proficiency with Pytest as a tool for running unit tests.
- **Workflow**: Demonstrated good Git workflow practices, including branch creation for specific tasks and cleanup post-merge.


---

## Journal Entry - Date: Oct 20, 2023

### Task:
- Integrate Redux into the ThriftBay application and create the first slice for managing categories.

### Objective:
To facilitate state management and provide a robust structure for the application by incorporating Redux and creating a slice for categories.

### Steps Taken:
1. **Issue Creation**: Opened issue `#71` to document the need for creating a Redux slice for categories.
2. **New Branch Creation**: Created a new branch specifically for this task (`71-create-slice-for-categories`).
3. **Code Development**: Made multiple pushes to the branch, indicating active development and potentially iterative testing.
4. **Merge Request**: Opened merge request `!57`,
5. **Additional Commits**: Made additional pushes after the merge request,
6. **Cleanup**: Deleted the branch post-merging or after achieving the goal, adhering to best practices for branch management.

### Challenges:
- **State Management**: Incorporating Redux can be challenging due to its steep learning curve and the complexity it adds to the app.

### Solutions:
- **Iterative Development**: Multiple pushes suggest a step-by-step, iterative approach to implementing the feature, possibly allowing for easier debugging and quality assurance.

### Lessons Learned:
- **Redux**: Improved understanding and skills regarding Redux, which is widely used in the industry for state management.
- **Slice Management**: Gained hands-on experience with creating and managing a Redux slice, a crucial part of any Redux-based application.
- **Workflow**: Continued to demonstrate good Git workflow practices.

---

## Journal Entry - Date: Oct 24, 2023

### Task:
- Add authentication slice to the Redux store in the ThriftBay application.

### Objective:
To handle authentication-related state in a centralized, efficient manner by using Redux for state management.

### Steps Taken:
1. **Previous Tasks**: Accepted and merged multiple previous tasks into the main branch and closed their respective issues.
2. **Issue Creation**: Opened a new issue `(#80)` to document the requirement for adding an authentication slice to Redux.
3. **New Branch Creation**: Created a new branch named `80-creating-auth` for implementing this task.
4. **Code Development**: Made multiple pushes to the branch to add the new Redux slice for authentication.
5. **Merge Request**: Opened a merge request `(!65)`,
6. **Branch Deletion**: Deleted the `80-creating-auth` branch,

### Challenges:
- **Complexity**: Authentication is a critical part of any application and must be implemented securely, adding a layer of complexity.

### Solutions:
- **Modular Design**: By using Redux slices, the codebase can maintain modularity and high cohesion for authentication tasks.

### Lessons Learned:
- **Advanced Redux**: This task provided an opportunity to work on a more advanced use case for Redux, diving deeper into state management.
- **Secure Authentication**: Gained experience in integrating secure and efficient authentication mechanisms within a Redux environment.
- **Best Practices**: Continued to follow best practices in Git flow by maintaining well-organized branches and effectively using merge requests.

---

## Journal Entry - Date: Oct 25, 2023

### Task:
- Fix bugs related to page redirection in the ThriftBay application.

### Objective:
To ensure that users are redirected to the appropriate pages after specific actions, providing a seamless and intuitive user experience.

### Steps Taken:
1. **Issue Creation**: Opened multiple issues (`#87`, `#88`, `#89`) to document the bugs and features related to redirections in the application.
2. **Branch Creation**: Created new branches for each issue (`87-redirect-bug`, `88-redirect-bug`, `89-redirects`) to isolate the work.
3. **Bug Fixing**: Made multiple pushes to these branches, iterating on the code to fix the bugs.
4. **Merge Requests**: Opened and accepted several merge requests (`!73`, `!74`, `!75`, `!78`) to integrate the bug fixes into the main codebase.
5. **Issue Closure**: Closed the related issues (`#88`) after confirming the bug was fixed.
6. **Branch Deletion**: Deleted branches (`87-redirect-bug`, `88-redirect-bug`) post-merging, adhering to clean code practices.

### Challenges:
- **Multiple Bugs**: The task required tracking and resolving multiple redirection bugs simultaneously, which could be confusing.
- **User Experience**: Ensuring that the user is redirected to the appropriate pages without errors is critical for a good user experience.

### Solutions:
- **Isolated Work**: By creating separate branches for each bug, it was easier to manage and fix them without affecting other parts of the application.
- **Iterative Development**: Made multiple pushes to fine-tune the fixes and ensure everything works as expected.

### Lessons Learned:
- **Debugging**: The task involved deep debugging skills to identify and fix the root cause of the redirection issues.
- **Git Workflow**: Managed multiple branches and issues efficiently, gaining further experience in advanced Git practices.
- **User-Centric Focus**: Understanding the importance of seamless user redirection for enhancing the overall user experience.

---

## Journal Entry - Date: Oct 26, 2023

### Task:
- Enhance the navigation bar (navbar) to display different options based on whether the user is logged in or signed up.

### Objective:
To improve user experience by customizing the navbar according to the user's authentication status, making the application more intuitive and user-friendly.

### Steps Taken:
1. **Closing Previous Tasks**: Accepted previous merge requests and closed related issues, ensuring the main branch is up-to-date.
2. **Branch Creation**: Worked on an existing branch `72-navbar-change` dedicated to navbar changes.
3. **Code Updates**: Made multiple pushes to the `72-navbar-change` branch, iteratively developing the feature.
4. **Merge Requests**: Opened and accepted a merge request (`!83`) for the navbar changes.
5. **Issue Closure**: Closed related issue (`#62`) post-merge.
6. **Branch Deletion**: Deleted the `72-navbar-change` branch after merging to keep the repo clean.
7. **New Tasks**: Opened a new issue (`#97`) and created a new branch (`97-create-product-nav`) for further enhancements.

### Challenges:
- **Conditional Rendering**: The task required conditional logic to display different navbar options based on user status.
- **UI/UX Design**: Striking a balance between functionality and user interface design.

### Solutions:
- **Modular Code**: Used conditional rendering techniques to change navbar options dynamically.
- **Iterative Development**: Multiple pushes were made to fine-tune the feature and ensure it aligns with user expectations.

### Lessons Learned:
- **User-Centric Development**: Gained deeper understanding of building features focused on enhancing the user experience.
- **Git Workflow**: Continued to employ best practices in Git by managing branches, issues, and merge requests efficiently.
- **Conditional Logic**: Mastered the use of conditional statements in the frontend to render different UI components based on varying conditions.

---

## Journal Entry - Date: Oct 27, 2023

### Tasks:
1. Rework the navigation bar for better user experience.
2. Refactor the sign-up page to use a slice for state management.

### Objectives:
- Improve the navigation bar to make it more intuitive.
- Utilize Redux slices to manage state efficiently in the sign-up page.

### Steps Taken:
#### Navigation Bar:
1. **New Issue and Branch**: Opened issue `#101` and created a new branch `101-reworking-navbar`.
2. **Development**: Made multiple pushes to the branch, enhancing the navbar.
3. **Merge Request**: Opened and later deleted a merge request for the new navbar (`!90`).

#### Sign-Up Page:
1. **New Issue and Branch**: Opened issue `#102` and created a new branch `102-reworking-sign-up`.
2. **Slice Creation**: Changed the sign-up page to utilize a Redux slice for state management.
3. **Merge Request**: Opened a merge request (`!91`) and later closed it. Perhaps the feature was integrated in another merge request.

#### Miscellaneous:
- Closed existing issues and accepted merge requests to keep the main branch updated.
- Opened additional issues for deployment errors and testing.

### Challenges:
- **Redesign**: The redesigning of existing features like the navbar can be challenging as it must align with previous UX while adding improvements.
- **State Management**: Implementing slices in Redux requires a good understanding of state management.

### Solutions:
- **Iterative Development**: Constant updates were pushed to implement the best possible solutions.
- **Redux Slices**: Successfully used Redux slices to refactor the sign-up page, improving code maintainability.

### Lessons Learned:
- **UI/UX Skills**: Improved skills in designing interfaces that are user-friendly and intuitive.
- **Advanced Redux**: Gained more experience in using Redux slices for state management, which is a scalable way to manage application state.
- **Effective Git Workflow**: The use of issues, branches, and merge requests in Git ensures that every change is documented and can be traced back.

