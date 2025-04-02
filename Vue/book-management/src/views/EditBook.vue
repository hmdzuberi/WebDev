<template>
    <div>
        <h2>EditBook</h2>
        <book-form :book="book" @submit="updateBook" />
    </div>
</template>

<script>
import BookForm from '../components/BookForm.vue'
import BookService from '../services/BookService'

export default {
    components: {
        BookForm
    },
    data() {
        return {
            book: {}
        }
    },
    methods: {
        fetchBook() {
            const id = this.$route.params.id
            BookService.getBookById(id)
                .then(response => {
                    this.book = response.data
                })
                .catch(error => {
                    console.error('Error fetching book:', error)
                })
        },
        updateBook(updatedBook) {
            const id = this.$route.params.id
            BookService.updateBook(id, updatedBook)
                .then(() => {
                    this.$router.push('/');
                })
                .catch(error => {
                    console.error('Error updating book:', error)
                })
        }
    },
    mounted() {
        this.fetchBook()
    }
}
</script>