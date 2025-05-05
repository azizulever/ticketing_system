const adminCredentials = { id: "admin", password: "admin123" };
const ticketForm = document.getElementById("ticket-form");
const adminLoginForm = document.getElementById("admin-login-form");
const adminDashboard = document.getElementById("admin-dashboard");
const ticketList = document.getElementById("ticket-list");

let tickets = [];

// Handle ticket submission
ticketForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const issue = document.getElementById("issue").value;
    const priority = document.getElementById("priority").value;

    const ticket = { id: Date.now(), issue, priority };
    tickets.push(ticket);

    alert("Ticket generated successfully!");
    ticketForm.reset();
    localStorage.setItem("tickets", JSON.stringify(tickets));
});

// Handle admin login
adminLoginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const adminId = document.getElementById("admin-id").value;
    const adminPassword = document.getElementById("admin-password").value;

    if (adminId === adminCredentials.id && adminPassword === adminCredentials.password) {
        alert("Login successful!");
        window.location.href = "admin.html"; // Redirect to admin page
    } else {
        alert("Invalid credentials!");
    }
});

// Render tickets in admin dashboard
function renderTickets() {
    ticketList.innerHTML = "";
    
    if (tickets.length === 0) {
        const noTickets = document.createElement("div");
        noTickets.className = "no-tickets-message";
        noTickets.textContent = "No pending issues at the moment.";
        ticketList.appendChild(noTickets);
        return;
    }
    
    tickets.forEach((ticket) => {
        const li = document.createElement("li");
        li.setAttribute('data-priority', ticket.priority);
        
        const contentDiv = document.createElement("div");
        contentDiv.className = "ticket-content";
        contentDiv.textContent = ticket.issue;
        
        const priorityTag = document.createElement("span");
        priorityTag.textContent = ticket.priority;
        priorityTag.className = "priority-tag";
        
        // Add specific class based on priority
        if (ticket.priority === "Low") {
            priorityTag.classList.add("low");
        } else if (ticket.priority === "High") {
            priorityTag.classList.add("high");
        } else if (ticket.priority === "Very High") {
            priorityTag.classList.add("very-high");
        }
        
        contentDiv.appendChild(priorityTag);
        
        const resolveButton = document.createElement("button");
        resolveButton.textContent = "Resolve";
        resolveButton.addEventListener("click", () => resolveTicket(ticket.id));

        li.appendChild(contentDiv);
        li.appendChild(resolveButton);
        ticketList.appendChild(li);
    });
}

// Resolve ticket
function resolveTicket(ticketId) {
    tickets = tickets.filter((ticket) => ticket.id !== ticketId);
    alert("Ticket resolved!");
    renderTickets();
}
