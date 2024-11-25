# Windows Explorer Web App

This is a simple web application that mimics the behavior of a file explorer. It consists of a frontend built with React and a backend built with Node.js and MySQL.

## Prerequisites

Before starting, make sure you have the following installed on your machine:

- **Node.js** (v14 or higher) - [Download here](https://nodejs.org/)
- **MySQL** - [Download here](https://dev.mysql.com/downloads/installer/)
- **Git** - [Download here](https://git-scm.com/)

## Backend Setup

1. **Clone the repository** (if not already done):
    ```bash
    git clone 
    ```

2. **Install dependencies** for the backend:
    ```bash
    cd backend
    npm install
    ```

3. **Configure MySQL Database**:
    - Create a new MySQL database named `windows_explorer`:
      ```sql
      CREATE DATABASE infokes_windows_explorer;
      ```

    - Run the SQL script from db.sql
      ```

4. **Create a `.env` file** in the `backend` directory to configure the MySQL connection:

    ```env
    DB_HOST=
    DB_USER=
    DB_PASSWORD=
    DB_NAME=
    DB_PORT=
    ```

5. **Run the backend**:
    ```bash
    npm start
    ```
    The backend will now be running on `http://localhost:8001`.

## Frontend Setup

1. **Install dependencies** for the frontend:
    ```bash
    cd frontend
    npm install
    ```

2. **Run the frontend**:
    ```bash
    npm start
    ```
    The frontend will now be running on `http://localhost:5173`.

## Usage

- Open your browser and navigate to `http://localhost:5173`.
- The app will load the folder structure on the left panel.
- Click on any folder to view its subfolders.
- If the folder has files, they will be displayed on the right panel.

## Endpoints

### Backend API Endpoints:

1. **Get folder structure**:
    - **GET** `/api/v1/folders`
    - Returns the list of all folders in the database.

2. **Get subfolders of a folder**:
    - **GET** `/api/v1/sub_folders/{folderId}`
    - Returns a list of subfolders for the specified folder.

3. **Get files in a subfolder**:
    - **GET** `/api/v1/files/{subFolderId}`
    - Returns the list of files for the specified folder (subfolder).

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
