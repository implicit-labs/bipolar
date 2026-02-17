// Server-side data and form actions
// This enables progressive enhancement — works without JavaScript

let tasks = $state([
	{ id: 1, text: 'Learn SvelteKit', completed: false },
	{ id: 2, text: 'Build a task list', completed: false }
]);

let nextId = 3;

/** @type {import('./$types').PageServerLoad} */
export function load() {
	return {
		tasks: tasks
	};
}

/** @type {import('./$types').Actions} */
export const actions = {
	// Add a new task
	add: async ({ request }) => {
		const data = await request.formData();
		const text = data.get('text')?.toString();

		if (text && text.trim()) {
			tasks.push({
				id: nextId++,
				text: text.trim(),
				completed: false
			});
		}
	},

	// Toggle task completion
	toggle: async ({ request }) => {
		const data = await request.formData();
		const id = Number(data.get('id'));

		const task = tasks.find(t => t.id === id);
		if (task) {
			task.completed = !task.completed;
		}
	},

	// Delete a task
	delete: async ({ request }) => {
		const data = await request.formData();
		const id = Number(data.get('id'));

		tasks = tasks.filter(t => t.id !== id);
	}
};
