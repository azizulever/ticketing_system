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
    localStorage.setItem("tickets", JSON.stringify(tickets)); // Save tickets to localStorage
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
    tickets.forEach((ticket) => {
        const li = document.createElement("li");
        li.textContent = `${ticket.issue} (Priority: ${ticket.priority})`;

        // Apply priority-based coloring
        if (ticket.priority === "High") {
            li.style.color = "red";
        } else if (ticket.priority === "Medium") {
            li.style.color = "orange";
        } else {
            li.style.color = "green";
        }

        const resolveButton = document.createElement("button");
        resolveButton.textContent = "Resolve";
        resolveButton.addEventListener("click", () => resolveTicket(ticket.id));

        li.appendChild(resolveButton);
        ticketList.appendChild(li);
    });
}

// Resolve a ticket
function resolveTicket(ticketId) {
    tickets = tickets.filter((ticket) => ticket.id !== ticketId);
    alert("Ticket resolved!");
    renderTickets();
}
