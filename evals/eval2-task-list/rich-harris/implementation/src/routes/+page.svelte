<script>
	import { enhance } from '$app/forms';

	// Props from server
	let { data } = $props();

	// Client-side reactive state using runes
	let tasks = $state(data.tasks);
	let newTaskText = $state('');

	// Derived state — the "best API is no API"
	let activeTasks = $derived(tasks.filter(t => !t.completed));
	let completedTasks = $derived(tasks.filter(t => t.completed));
	let remainingCount = $derived(activeTasks.length);
</script>

<main>
	<h1>Tasks</h1>

	<!-- Add task form with progressive enhancement -->
	<form method="POST" action="?/add" use:enhance={() => {
		return async ({ update }) => {
			await update();
			newTaskText = '';
		};
	}}>
		<input
			type="text"
			name="text"
			bind:value={newTaskText}
			placeholder="What needs to be done?"
			required
		/>
		<button type="submit">Add</button>
	</form>

	{#if tasks.length === 0}
		<p class="empty">No tasks yet. Add one above!</p>
	{:else}
		<!-- Active tasks -->
		{#if activeTasks.length > 0}
			<section>
				<h2>{remainingCount} {remainingCount === 1 ? 'task' : 'tasks'} remaining</h2>
				<ul>
					{#each activeTasks as task (task.id)}
						<li>
							<form method="POST" action="?/toggle" use:enhance>
								<input type="hidden" name="id" value={task.id} />
								<button type="submit" class="toggle" aria-label="Mark complete">
									<span class="checkbox"></span>
								</button>
							</form>
							<span class="text">{task.text}</span>
							<form method="POST" action="?/delete" use:enhance>
								<input type="hidden" name="id" value={task.id} />
								<button type="submit" class="delete" aria-label="Delete task">×</button>
							</form>
						</li>
					{/each}
				</ul>
			</section>
		{/if}

		<!-- Completed tasks -->
		{#if completedTasks.length > 0}
			<section class="completed">
				<h2>Completed</h2>
				<ul>
					{#each completedTasks as task (task.id)}
						<li>
							<form method="POST" action="?/toggle" use:enhance>
								<input type="hidden" name="id" value={task.id} />
								<button type="submit" class="toggle" aria-label="Mark incomplete">
									<span class="checkbox checked"></span>
								</button>
							</form>
							<span class="text done">{task.text}</span>
							<form method="POST" action="?/delete" use:enhance>
								<input type="hidden" name="id" value={task.id} />
								<button type="submit" class="delete" aria-label="Delete task">×</button>
							</form>
						</li>
					{/each}
				</ul>
			</section>
		{/if}
	{/if}
</main>

<style>
	main {
		max-width: 600px;
		margin: 2rem auto;
		padding: 0 1rem;
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
	}

	h1 {
		font-size: 2.5rem;
		font-weight: 200;
		color: rgba(175, 47, 47, 0.15);
		text-align: center;
		margin-bottom: 1rem;
	}

	h2 {
		font-size: 0.875rem;
		font-weight: 400;
		color: #777;
		margin: 1.5rem 0 0.5rem;
	}

	form[action="?/add"] {
		display: flex;
		gap: 0.5rem;
		margin-bottom: 1rem;
	}

	input[type="text"] {
		flex: 1;
		padding: 0.75rem 1rem;
		font-size: 1rem;
		border: 1px solid #ddd;
		border-radius: 4px;
	}

	input[type="text"]:focus {
		outline: none;
		border-color: #af2f2f;
	}

	button[type="submit"]:not(.toggle):not(.delete) {
		padding: 0.75rem 1.5rem;
		background: #af2f2f;
		color: white;
		border: none;
		border-radius: 4px;
		cursor: pointer;
		font-size: 1rem;
	}

	button[type="submit"]:not(.toggle):not(.delete):hover {
		background: #942828;
	}

	.empty {
		text-align: center;
		color: #999;
		margin: 2rem 0;
	}

	ul {
		list-style: none;
		padding: 0;
		margin: 0;
	}

	li {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		padding: 0.75rem 0;
		border-bottom: 1px solid #eee;
	}

	.toggle {
		background: none;
		border: none;
		cursor: pointer;
		padding: 0;
		display: flex;
		align-items: center;
	}

	.checkbox {
		width: 24px;
		height: 24px;
		border: 2px solid #ddd;
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		transition: all 0.2s;
	}

	.checkbox:hover {
		border-color: #af2f2f;
	}

	.checkbox.checked {
		background: #af2f2f;
		border-color: #af2f2f;
	}

	.checkbox.checked::after {
		content: '✓';
		color: white;
		font-size: 14px;
	}

	.text {
		flex: 1;
		font-size: 1rem;
		color: #333;
	}

	.text.done {
		text-decoration: line-through;
		color: #999;
	}

	.delete {
		background: none;
		border: none;
		color: #cc9a9a;
		font-size: 1.5rem;
		cursor: pointer;
		padding: 0;
		width: 30px;
		height: 30px;
		line-height: 1;
		opacity: 0;
		transition: opacity 0.2s;
	}

	li:hover .delete {
		opacity: 1;
	}

	.delete:hover {
		color: #af2f2f;
	}

	.completed {
		margin-top: 2rem;
	}
</style>
