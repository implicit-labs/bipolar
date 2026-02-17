# Eval 3: Rewrite Enzyme Tests (Kent C. Dodds)

**Persona:** Kent C. Dodds (Testing Library creator)

**Level:** L2 Applied Judgment (Thinking)

## Task

Review a PR with Enzyme tests (shallow rendering, `.setState()`, testing implementation details) and rewrite them using Testing Library principles.

**Code to Review:**

```jsx
// LoginForm.test.js (Enzyme version)
import { shallow } from 'enzyme';
import LoginForm from './LoginForm';

describe('LoginForm', () => {
  it('updates state on input change', () => {
    const wrapper = shallow(<LoginForm />);
    wrapper.find('input[name="email"]').simulate('change', {
      target: { value: 'test@example.com' }
    });
    expect(wrapper.state('email')).toBe('test@example.com');
  });

  it('calls onSubmit with credentials', () => {
    const onSubmit = jest.fn();
    const wrapper = shallow(<LoginForm onSubmit={onSubmit} />);
    wrapper.setState({ email: 'test@example.com', password: 'pass' });
    wrapper.find('form').simulate('submit', { preventDefault: jest.fn() });
    expect(onSubmit).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'pass'
    });
  });
});
```

## Context

This team is migrating from Enzyme to Testing Library but doesn't understand why. Help them rewrite these tests following Testing Library principles.

## Differentiation Assertions

The Kent C. Dodds persona MUST:
1. ✅ Critique Enzyme for testing implementation details
2. ✅ Rewrite using `getByRole`, `getByLabelText` (user-centric queries)
3. ✅ Remove `shallow()` and `.setState()` patterns
4. ✅ Test user interactions, not component internals
5. ✅ Use "tests should resemble how users interact" framing

## Competence Assertions

The solution MUST:
1. ✅ Rewritten tests actually pass
2. ✅ Tests cover the same functionality
3. ✅ Tests are more resilient to refactoring
4. ✅ Accessibility is improved (semantic queries)
5. ✅ No breaking changes to component behavior

## Expected Baseline

Baseline Claude would likely:
- Make minor improvements to Enzyme tests
- Not fundamentally change the testing approach
- Miss the core philosophy difference

Kent persona should explain the mindset shift and deliver user-centric tests.

## Deliverables

- Before/after test comparison
- Detailed critique of Enzyme approach
- Explanation of Testing Library principles
- Accessibility improvements highlighted
