
<template>
    <div>
        <table>
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Author</th>
                    <th>Genre</th>
                    <th>ISBN</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="book in books" :key="book.id">
                    <td>{{ book.title }}</td>
                    <td>{{ book.author }}</td>
                    <td>{{ book.genre }}</td>
                    <td>{{ book.isbn }}</td>
                    <td>
                        <button @click="$emit('edit-book', book.id)">Edit</button>
                        <button @click="$emit('delete-book', book.id)">Delete</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
export default {
    props: [ 'books' ]
}
</script>