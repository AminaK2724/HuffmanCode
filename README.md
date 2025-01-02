# **Huffman Coding Application**

This is a full-stack application that implements Huffman coding, a data compression algorithm. The project allows users to encode text using predefined or dynamically calculated probabilities for the characters. The application is built with a React frontend and a Spring Boot backend.

---

## **Features**
- Encode text with predefined character probabilities (editable by the user).
- Encode text with dynamically calculated probabilities based on the input.
- Save and load custom probabilities for predefined encoding.
- User-friendly interface with input validation.
- Decode functionality is **not yet implemented** (future work).

---

## **Tech Stack**
- **Frontend**: React.js
- **Backend**: Spring Boot (Java)
- **Build Tool**: Maven
- **Database**: N/A
- **Deployment**: Netlify (Frontend), Render (Backend)

---

## **How to Run Locally**

### Prerequisites
1. **Node.js** (for the frontend)
2. **Java 11 or higher** (for the backend)
3. **Maven** (for building the backend)

### Clone the Repository
```bash
git clone https://github.com/AminaK2724/HuffmanCode.git
cd HuffmanCode
```

---

### **Frontend**
1. Navigate to the frontend directory:
   ```bash
   cd front-end
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm start
   ```
4. Access the frontend at: [http://localhost:3000](http://localhost:3000)

---

### **Backend**
1. Navigate to the backend directory:
   ```bash
   cd huffman-backend
   ```
2. Build the project using Maven:
   ```bash
   mvn clean package
   ```
3. Run the Spring Boot application:
   ```bash
   java -jar target/huffman-backend-0.0.1-SNAPSHOT.jar
   ```
4. The backend will run on: [http://localhost:8080](http://localhost:8080)

---

## **How to Use**
1. **Predefined Probabilities**:
   - Edit the probabilities for characters in the frontend UI.
   - Save the updated probabilities for future use.
   - Click "Encode" to generate the encoded text.

2. **Dynamic Probabilities**:
   - Enter text to encode without predefined probabilities.
   - The application calculates probabilities dynamically.
   - Click "Encode" to generate the encoded text.

3. **Decode Functionality**: 
   - **Currently not implemented**. This is planned for future updates.

---

## **Future Improvements**
- Add decoding functionality for both predefined and dynamically calculated encodings.
- Improve UI/UX with additional feedback for users.
- Add a database to store user-defined probabilities persistently.
- Extend deployment to support CI/CD pipelines.

---

## **Contributing**
Feel free to fork this repository and contribute to the project by submitting pull requests.

---

## **Contact**
For any inquiries or feedback, please reach out to:

**Amina Khan**  
aminak2724@gmail.com | [GitHub](https://github.com/AminaK2724) | [Netlify Deployment](https://simple-huffman-coding.netlify.app)


