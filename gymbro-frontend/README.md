<h1>GymBro</h1>

<h3>What is it?</h3>
<p>A full-stack MERN e-commerce web application that sells activewears and supplements</p>

<h3>What I learned</h3>
<ul>
    <li>React built-in hooks such as useState(), useReducer(), useRef(), useContext(), useCallback(), useMemo(), and useEffect()</li>
    <li>Created React custom hooks to reuse logics across various components</li>
    <li>React router</li>
    <li>Optimized application performance by leveraging React.memo() to prevent un-necessary re-renders of a component and performance hooks (useCallback(), useMemo</li>()) to avoid expensive computations
    <li>MongoDB and design of collections and documents</li>
    <li>Server set-up for data storage</li>
    <li>Leveraged NodeMailer library to set up SMTP server for sending email verification</li>
    <li>Developed REST APIs that perform CRUD operations on multiple collections and documents</li>
    <li>Stripe integration</li>
</ul>

### ------------------------------------- DEPLOYMENT INSTRUCTIONS ------------------------------------- ###
1. DEV

### comment out the below code
```
REACT_APP_SERVER_URL=https://gymbro-ecomm-web-app-backend.vercel.app    # for production environment
```

### uncomment the below code
```
REACT_APP_SERVER_URL=http://localhost:4000  # for development environment
```