import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

// GET /api/todos - Get all todos
export async function GET() {
  try {
    const todos = await db.todos.findAll()
    return NextResponse.json(todos)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch todos' },
      { status: 500 }
    )
  }
}

// POST /api/todos - Create a new todo
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { title } = body

    if (!title || typeof title !== 'string') {
      return NextResponse.json(
        { error: 'Title is required' },
        { status: 400 }
      )
    }

    const newTodo = await db.todos.create({
      title,
      completed: false,
    })

    return NextResponse.json(newTodo, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create todo' },
      { status: 500 }
    )
  }
}
