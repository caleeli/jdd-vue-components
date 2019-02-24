export default {
    methods: {
        /**
         * Click on component
         */
        jddClick(event) {
            this.$emit('jdd-click', event, this);
        },
        mountJddEvent(element) {
            element.addEventListener('click', (event) => {
                this.jddClick(event);
            });
        },
    },
};
