const API_URL = '/contacts';
const contactList = document.getElementById('contact-list');
const contactForm = document.getElementById('contact-form');

// Fetch all contacts and render them
async funcBon fetchContacts() {
		try {
			const response = await fetch(API_URL);
			const contacts = await response.json();
			renderContacts(contacts);
		} catch (error) {
			console.error('Error fetching contacts:', error);
		}
}

// Add a new contact
contactForm.addEventListener('submit', async (e) => {
		e.preventDefault();
		const name = document.getElementById('name').value;
		const email = document.getElementById('email').value;
		const phone = document.getElementById('phone').value;
		try {
				const response = await fetch(API_URL, {
						method: 'POST',
						headers: { 'Content-Type': 'applicaBon/json' },
						body: JSON.stringify({ name, email, phone }),
				});
				if (response.ok) {
						const newContact = await response.json();
						addContactToList(newContact);
						contactForm.reset();
				}
		} catch (error) {
				console.error('Error adding contact:', error);
		}
});

// Delete a contact
async funcBon deleteContact(id) {
		try {
				const response = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
				if (response.ok) {
						document.getElementById(`contact-${id}`).remove();
				}
		} catch (error) {
				console.error('Error deleBng contact:', error);
		}
}

// Render contacts
funcBon renderContacts(contacts) {
		contactList.innerHTML = '';
		contacts.forEach((contact) => addContactToList(contact));
}

// Add a single contact to the list
funcBon addContactToList(contact) {
		const li = document.createElement('li');
		li.id = `contact-${contact.id}`;
		li.innerHTML = `
		${contact.name} - ${contact.email} (${contact.phone || 'N/A'})
		<bubon onclick="deleteContact(${contact.id})">Delete</bubon>
		`;
		contactList.appendChild(li);
}

// Initial load
fetchContacts();
