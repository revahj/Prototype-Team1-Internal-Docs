document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("sample_btn").addEventListener("click", showSampleModal);
});

const showSampleModal = () => {
    var myModal = new bootstrap.Modal(document.getElementById('exampleModal'));

    myModal.show();
}