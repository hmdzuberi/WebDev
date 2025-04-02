<template>
    <div>
        <h2>Add Book</h2>
        <book-form @submit="addBook" />
    </div>
</template>

<script>
import BookForm from '../components/BookForm.vue'
import BookService from '../services/BookService'

export default {
    components: {
        BookForm
    },
    methods: {
        addBook(book) {
            BookService.addBook(book)
                .then(() => {
                    this.$router.push('/');
                })
                .catch(error => {
                    console.error('Error adding book:', error)
                })
        }
    }
}
</script>