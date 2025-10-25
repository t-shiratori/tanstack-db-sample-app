import { NextRequest, NextResponse } from 'next/server'
import { db } from '@/lib/db'

type RouteParams = {
  params: Promise<{ id: string }>
}

// PUT /api/todos/[id] - Update a todo
export async function PUT(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const { id } = await params
    const body = await request.json()

    const updatedTodo = await db.todos.update(id, body)

    if (!updatedTodo) {
      return NextResponse.json(
        { error: 'Todo not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(updatedTodo)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update todo' },
      { status: 500 }
    )
  }
}

// DELETE /api/todos/[id] - Delete a todo
export async function DELETE(
  request: NextRequest,
  { params }: RouteParams
) {
  try {
    const { id } = await params
    const success = await db.todos.delete(id)

    if (!success) {
      return NextResponse.json(
        { error: 'Todo not found' },
        { status: 404 }
      )
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to delete todo' },
      { status: 500 }
    )
  }
}
