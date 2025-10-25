# TanStack DB Sample - Todo App

TanStack DBの主要機能を学習するためのシンプルなTodoアプリケーションです。

## TanStack DBの3つの柱

このサンプルアプリでは、TanStack DBの核となる3つの機能を実装しています:

### 1. Collections (コレクション)
型付けされたデータセットで、自動的にサーバーと同期します。

**実装箇所**: [app/db/collections.ts](app/db/collections.ts)

```typescript
export const todoCollection = createCollection(
  queryCollectionOptions<Todo>({
    queryKey: ['todos'],
    queryFn: async () => { /* データ取得 */ },
    getKey: (item) => item.id,
    onUpdate: async ({ transaction }) => { /* 更新処理 */ },
    onDelete: async ({ transaction }) => { /* 削除処理 */ },
    onCreate: async ({ transaction }) => { /* 作成処理 */ },
  })
)
```

### 2. Live Queries (ライブクエリ)
リアクティブなクエリで、コレクションの変更を自動的に検知してUIを更新します。

**実装箇所**: [app/components/TodoList.tsx](app/components/TodoList.tsx)

```typescript
const { data: todos } = useLiveQuery((q) =>
  q.from({ todo: todoCollection })
   .where(({ todo }) => eq(todo.completed, false))
   .orderBy(({ todo }) => todo.createdAt, 'desc')
)
```

### 3. Optimistic Mutations (楽観的更新)
UIを即座に更新し、バックグラウンドでサーバーと同期します。

**実装箇所**: [app/components/TodoItem.tsx](app/components/TodoItem.tsx)

```typescript
const handleToggle = () => {
  todoCollection.update(todo.id, (draft) => {
    draft.completed = !draft.completed
  })
}
```

## 技術スタック

- **Next.js 15** - App Router使用
- **TypeScript** - 型安全性
- **TanStack DB** - リアクティブなクライアントストア
  - `@tanstack/react-db` - React統合
  - `@tanstack/query-db-collection` - TanStack Query連携
- **TanStack Query** - データフェッチング
- **Tailwind CSS** - スタイリング

## セットアップ

### 前提条件

- [mise](https://mise.jdx.dev/) がインストールされていること

### 1. Node.jsのセットアップ

このプロジェクトはNode.js v22.21.0を使用します。miseを使って自動的にインストールされます。

```bash
mise install
```

### 2. 依存関係のインストール

```bash
pnpm install
```

### 3. 開発サーバーの起動

```bash
pnpm dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開いてください。

### その他のコマンド

```bash
# ビルド
pnpm build

# 本番サーバー起動
pnpm start

# Lint実行
pnpm lint
```

## プロジェクト構造

```
tanstack-db/
├── app/
│   ├── api/
│   │   └── todos/              # REST API エンドポイント
│   │       ├── route.ts        # GET, POST
│   │       └── [id]/route.ts   # PUT, DELETE
│   ├── components/
│   │   ├── TodoList.tsx        # ライブクエリ使用
│   │   ├── TodoItem.tsx        # 楽観的更新使用
│   │   └── AddTodoForm.tsx     # Todo作成
│   ├── db/
│   │   └── collections.ts      # TanStack DBコレクション定義
│   ├── providers/
│   │   └── QueryProvider.tsx   # TanStack Query設定
│   ├── layout.tsx              # ルートレイアウト
│   ├── page.tsx                # メインページ
│   └── globals.css             # グローバルスタイル
├── lib/
│   └── db.ts                   # インメモリDB (サンプル用)
├── types/
│   └── todo.ts                 # 型定義
└── package.json
```

## 機能

- ✅ Todo追加
- ✅ Todo完了/未完了切り替え
- ✅ Todo削除
- ✅ フィルタリング (全て/アクティブ/完了済み)
- ✅ 日付でソート (新しい順)
- ✅ 楽観的更新による即座のUI反映
- ✅ バックエンドAPIとの自動同期

## 学習ポイント

### コレクションの理解

[app/db/collections.ts](app/db/collections.ts:17-45) を確認してください。

- `queryFn`: 初期データの取得方法
- `getKey`: 各アイテムの一意なキーの取得
- `onUpdate/onCreate/onDelete`: サーバー同期処理

### ライブクエリの理解

[app/components/TodoList.tsx](app/components/TodoList.tsx:15-38) を確認してください。

- `useLiveQuery`: リアクティブなクエリフック
- `where`: フィルタリング条件
- `orderBy`: ソート条件

### 楽観的更新の理解

[app/components/TodoItem.tsx](app/components/TodoItem.tsx:13-22) を確認してください。

- `collection.update()`: 即座にUIを更新
- `collection.delete()`: 即座にアイテムを削除
- エラー時は自動的にロールバック

## データフロー

```
1. User Action (クリック等)
   ↓
2. Optimistic Mutation (即座にUI更新)
   ↓
3. Backend API Request (非同期でサーバーリクエスト)
   ↓
4. Success → UI維持 / Error → ロールバック
   ↓
5. Live Query (自動的に再レンダリング)
```

## TanStack DBの利点

1. **高速なUI更新** - 楽観的更新により、サーバー応答を待たずにUIが更新されます
2. **リアクティブ** - データ変更時に関連するコンポーネントが自動的に再レンダリングされます
3. **型安全** - TypeScriptによる完全な型サポート
4. **シンプルなAPI** - 直感的で使いやすいAPI設計

## 参考リンク

- [TanStack DB 公式ドキュメント](https://tanstack.com/db/latest)
- [TanStack Query ドキュメント](https://tanstack.com/query/latest)
- [Next.js ドキュメント](https://nextjs.org/docs)

## ライセンス

MIT
