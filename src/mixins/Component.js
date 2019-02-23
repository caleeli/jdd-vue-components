export default {
    methods: {
        /**
         * Click on component
         */
        jddClick(event) {
            this.$emit('jdd-click', event, this);
        }
    },
};
