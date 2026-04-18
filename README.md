# mwangaben-form-object

A TypeScript-friendly form object with generic type support for Laravel-style form handling. Perfect for managing form state, validation errors, and form data in JavaScript/TypeScript applications including Vue 3, React, or vanilla JS.

[![npm version](https://badge.fury.io/js/mwangaben-form-object.svg)](https://www.npmjs.com/package/mwangaben-form-object)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)

## Features

- ✅ **Full TypeScript Support** - Generic types for type-safe form data
- ✅ **Error Management** - Handle validation errors from Laravel or any backend
- ✅ **Form State Management** - Track and manipulate form fields
- ✅ **Framework Agnostic** - Works with Vue 3, React, Angular, or vanilla JS
- ✅ **Zero Dependencies** - Only uses lodash internally
- ✅ **Immutable Methods** - Most methods return new instances or support chaining

## Installation

```bash
npm install mwangaben-form-object
# or
yarn add mwangaben-form-object
# or
pnpm add mwangaben-form-object
```

## Quick Start

### Basic Usage (JavaScript)

```javascript
import MyForm from 'mwangaben-form-object';

// Create a form instance
const form = new MyForm({
  name: 'John Doe',
  email: 'john@example.com',
  age: 30
});

// Access form fields directly
console.log(form.name); // 'John Doe'
console.log(form.email); // 'john@example.com'

// Set errors (e.g., from Laravel validation)
form.error = {
  'name': ['The name field is required.'],
  'email': ['The email must be a valid email address.']
};

// Check for errors
if (form.hasError('name')) {
  console.log(form.errorOut('name')); // 'The name field is required.'
}

// Clear form
form.clearInput('name');
console.log(form.name); // ''
```

### TypeScript Usage with Generics

```javascript
import MyForm from 'mwangaben-form-object';

// Define your form data interface
interface UserFormData {
  name: string;
  email: string;
  age: number;
  role: 'admin' | 'user' | 'guest';
  preferences: {
    newsletter: boolean;
    notifications: boolean;
  };
}

// Create typed form instance
const form = new MyForm<UserFormData>({
  name: '',
  email: '',
  age: 0,
  role: 'user',
  preferences: {
    newsletter: true,
    notifications: false
  }
});

// Type-safe field access
form.name = 'Jane Doe'; // ✅ Works
form.age = 25; // ✅ Works
// form.age = 'twenty-five'; // ❌ TypeScript error
// form.invalid = 'something'; // ❌ TypeScript error

// Type-safe methods
form.clearInput('name'); // ✅ Works
// form.clearInput('invalid'); // ❌ TypeScript error

// Get typed data
const userData: UserFormData = form.getData();
```

## API Reference

### Constructor
```javascript
new MyForm<T>(defaults: T): MyForm<T>
```

Creates a new form instance with the given default values.

##### Parameters:

- defaults: T - An object containing the initial form field values


#### Example:
```javascript
const form = new MyForm({
  username: '',
  password: '',
  rememberMe: false
});
```

### Properties
- error: ErrorType
Object that stores validation errors. Each field can have an array of error messages.
```javascript
form.error = {
  'email': ['Email is required', 'Email format is invalid'],
  'password': ['Password must be at least 8 characters']
};

```
__defaults: T__

Original default values of the form.

#### Methods
**Error Handling**

**hasError(field: string): boolean**

Checks if a specific field has any validation errors.
```javascript
if (form.hasError('email')) {
  // Handle email error
}
```

**errorOut(field: string, callback?: CallableString): string | undefined**

Retrieves the first error message for a field. Optionally transforms the message using a callback.

```javascript
// Get raw error message
const error = form.errorOut('email'); // 'Email is required'

// Transform error message
const removeFieldPrefix = (message: string) => message.replace('email.', '');
const error = form.errorOut('email', removeFieldPrefix);
```

**clear(field: string): void**

Clears errors for a specific field.

```javascript
form.clear('email'); // Removes errors for email field
```

**clearAll(): {}**

Clears all errors from the form.

```javascript
form.clearAll(); // Resets error object to empty
```

**any(): boolean**

Checks if the form has any errors.

```javascript
if (!form.any()) {
  // Form has no errors, proceed with submission
  submitForm(form.getData());
}
```

#### Field Management

**clearInput<K extends keyof T>(field: K): void**

Clears the value of a specific form field and updates the defaults.
```javascript
form.clearInput('email');
console.log(form.email); // ''
```

**reset(): this**

Resets all form fields to empty strings. Returns the form instance for chaining.

```javascript
form.reset();
// All fields are now empty strings
```
**resetToZero(): this**

Resets all numeric form fields to zero. Non-numeric fields become 0 as well. Returns the form instance for chaining.


```javascript
const form = new MyForm({ age: 25, score: 100 });
form.resetToZero();
console.log(form.age); // 0
console.log(form.score); // 0
```

**removeProperty<K extends keyof T>(field: K): void**
Permanently removes a property from the form instance and defaults.


```javascript
form.removeProperty('age');
console.log(form.age); // undefined
```

**removeProperties<K extends keyof T>(fields: K[]): void**
Removes multiple properties at once.

```javascript
form.removeProperties(['age', 'email']);

```

*Type-Safe Helpers (TypeScript only)*

**getField<K extends keyof T>(field: K): T[K]**

Gets a field value with proper typing.
```javascript
const email: string = form.getField('email');
```

**setField<K extends keyof T>(field: K, value: T[K]): void**
Sets a field value with type checking.


```javascript
form.setField('age', 30); // ✅ Type-safe
// form.setField('age', 'thirty'); // ❌ TypeScript error
```

**getData(): T**

Returns the complete form data as a typed object.
```javascript
const formData: UserFormData = form.getData();
```


## Usage Examples

### Vue 3 Composition API

```vue
<template>
  <form @submit.prevent="handleSubmit">
    <div>
      <input v-model="form.name" type="text" />
      <span v-if="form.hasError('name')">{{ form.errorOut('name') }}</span>
    </div>
    
    <div>
      <input v-model="form.email" type="email" />
      <span v-if="form.hasError('email')">{{ form.errorOut('email') }}</span>
    </div>
    
    <button type="submit">Submit</button>
    <button type="button" @click="form.reset()">Reset</button>
  </form>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import MyForm from 'mwangaben-form-object';

interface FormData {
  name: string;
  email: string;
}

const form = reactive(new MyForm<FormData>({
  name: '',
  email: ''
}));

const handleSubmit = async () => {
  try {
    const response = await api.submit(form.getData());
    
    // Handle validation errors from backend
    if (response.errors) {
      form.error = response.errors;
    }
  } catch (error) {
    console.error('Submission failed', error);
  }
};
</script>
```

### React with Hooks


```tsx
import React, { useState } from 'react';
import MyForm from 'mwangaben-form-object';

interface LoginFormData {
  email: string;
  password: string;
}

export const LoginForm: React.FC = () => {
  const [form] = useState(() => new MyForm<LoginFormData>({
    email: '',
    password: ''
  }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!form.any()) {
      console.log('Submitting:', form.getData());
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={form.email}
        onChange={(e) => form.setField('email', e.target.value)}
      />
      {form.hasError('email') && <span>{form.errorOut('email')}</span>}
      
      <input
        type="password"
        value={form.password}
        onChange={(e) => form.setField('password', e.target.value)}
      />
      
      <button type="submit">Login</button>
      <button type="button" onClick={() => form.reset()}>Reset</button>
    </form>
  );
};
```

#### Laravel Backend Integration

```javascript
import MyForm from 'mwangaben-form-object';

interface PostFormData {
  title: string;
  content: string;
  category_id: number;
}

class PostForm extends MyForm<PostFormData> {
  async submit() {
    try {
      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(this.getData())
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        // Handle Laravel validation errors
        if (data.errors) {
          this.error = data.errors;
        }
        throw new Error('Submission failed');
      }
      
      this.clearAll();
      this.reset();
      return data;
    } catch (error) {
      console.error('Error submitting form', error);
      throw error;
    }
  }
}
```


#### Custom Error Transformer

```typescript
// Utility to remove field prefix from Laravel error messages
export const removeInputWord = (message: string): string => {
  return message.replace(/input\./g, '');
};

// Usage
const form = new MyForm({ name: '', email: '' });
form.error = {
  'input.name': ['The input.name field is required.'],
  'input.email': ['The input.email must be a valid email.']
};

const errorMessage = form.errorOut('input.name', removeInputWord);
console.log(errorMessage); // 'The name field is required.'
```
### TypeScript Interfaces

```typescript
// Available types from the package
import { ErrorType, CallableString, Callable, FormInstance } from 'mwangaben-form-object';

// Error object structure
interface ErrorType {
  [fieldName: string]: [string]; // Array of error messages
}

// String callback type
interface CallableString {
  (arg: string): string;
}

// Generic form instance type
type FormInstance<T = Record<string, any>> = MyForm<T>;
```

## Browser Support
Works in all modern browsers that support ES6+:
- Chrome/Edge 80+

- Firefox 75+

- Safari 13+

- Opera 67+

### Contributing
Contributions are welcome! Please submit a Pull Request or open an issue on [GitHub](https://github.com/mwangaben/mwangaben-form-object).

#### License
MIT © [Benedict Mwanga](https://github.com/mwangaben)


### v0.0.6
- Added full TypeScript generic support

- Added **getField()**, **setField()**, and **getData()** helper methods

- Improved type safety for all methods

- Added proper return types








