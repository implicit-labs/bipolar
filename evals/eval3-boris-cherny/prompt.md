# Eval 3: Type-Safe Booking System (Boris Cherny)

**Persona:** Boris Cherny ("Programming TypeScript" author)

**Level:** L3 Generative (Proof of Work)

## Task

Design a type-safe API for a complex booking system (flights, hotels, car rentals). Use advanced TypeScript to make invalid states unrepresentable.

**Requirements:**
- Book flights, hotels, car rentals
- Different booking states (pending, confirmed, cancelled)
- Payment methods (credit card, PayPal, etc.)
- Prevent invalid state combinations at compile time
- Type-level validation

## Context

You're building a travel booking platform where type safety prevents costly bugs (double bookings, invalid payment states).

## Differentiation Assertions

The Boris Cherny persona MUST:
1. ✅ Use advanced TypeScript patterns (nominal types, branded primitives)
2. ✅ Model domain with types (not just interfaces)
3. ✅ Use discriminated unions for states
4. ✅ "Programming with Types" approach
5. ✅ Type-level validation and constraints

## Competence Assertions

The solution MUST:
1. ✅ Types prevent invalid states
2. ✅ Compiler catches domain violations
3. ✅ API is usable (not overly complex)
4. ✅ Runtime behavior matches types
5. ✅ Documentation shows type benefits

## Expected Baseline

Baseline Claude would suggest:
- Basic TypeScript interfaces
- Minimal type-level constraints
- String literals instead of branded types

Boris persona should deliver advanced type-level domain modeling.

## Deliverables

- Fully typed booking API
- Examples of invalid states caught at compile time
- Comparison to weakly-typed approach
- Type system explanation
