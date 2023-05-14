import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import Todo from './Todo'

test('renders content', () => {
  const todo = {
    _id: "1234",
    text: "Test Todo",
    done: true
  }

  const mockDeleteTodo = () => {
    console.log('mock delete')
  }

  const mockCompleteTodo = () => {
    console.log('mock delete')
  }

  render(<Todo todo={todo}  deleteTodo={mockDeleteTodo} completeTodo={mockCompleteTodo} />)

  const element = screen.getByText('Test Todo')
  expect(element).toBeDefined()
})
