var component_data = [];

/* CALLBACK FUNCTIONS */
const removeTab = (event) => {
    let component_id = event.target.closest(".component_block").getAttribute("data-component-id");
    let tab_id = event.target.closest(".tab_item").getAttribute("data-tab-id");

    delete component_data[component_id].tabs[tab_id];
    event.target.closest("li").remove();
}

const fetchSelectedTabDetails = (event) => {
    let selected_tab_item    = event.target.closest("li");
    let component_block_item = selected_tab_item.closest(".component_block");

    selected_tab_item.closest(".tab_list").querySelector(".tab_item.active").classList.remove("active");
    selected_tab_item.classList.add("active");
    component_block_item.querySelector(".update_tab_form .title_tab_input").value = selected_tab_item.querySelector(".tab_name").textContent;
}

const addTab = (component_item, component_id) => {
    let tab_clone     = document.querySelector("#clone_block ul .tab_item").cloneNode(true);
    let random_tab_id = (Math.random() + 1).toString(36).substring(5);

    tab_clone.setAttribute("data-tab-id", random_tab_id);

    component_data[component_id].tabs[random_tab_id] = {
        name: "Untitled",
        description: ""
    }

    component_item.querySelector(".tab_list").prepend(tab_clone);

    /* EVENTS */
    tab_clone.querySelector(".remove_tab").addEventListener("click", (event) => removeTab(event));
    tab_clone.querySelector(".tab_name").addEventListener("click", fetchSelectedTabDetails);
}

const submitUpdateTabDetails = (tab_details_data, component_id) => {
    let { is_title }  = tab_details_data;
    let tab_title     = (is_title) && tab_details_data.tab_title_data;
    let active_tab    = document.querySelector(`.component_block[data-component-id="${ component_id }"] .tab_item.active`);
    let active_tab_id = active_tab.getAttribute("data-tab-id");

    active_tab.querySelector(".tab_name").textContent = tab_title;

    component_data[component_id].tabs[active_tab_id] = {
        name: tab_title,
        description: ""
    };
}

const addComponentItem = () => {
    let component_item_clone = document.querySelector("#clone_block .component_block").cloneNode(true);
    let random_component_id  = (Math.random() + 1).toString(36).substring(7);
    let random_tab_id        = (Math.random() + 1).toString(36).substring(5);

    component_item_clone.setAttribute("data-component-id", random_component_id);
    component_item_clone.querySelector(".tab_item").setAttribute("data-tab-id", random_tab_id);

    /* Add component data */
    component_data[random_component_id] = {
        tabs: []
    }

    /* Add tabs data */
    component_data[random_component_id].tabs[random_tab_id] = {
        name: "Untitled",
        description: ""
    }

    RedactorX(component_item_clone.querySelector(".tab_description_input"));
    document.getElementById("component_list").append(component_item_clone);

    /* EVENTS */
    component_item_clone.querySelector(".add_tab_btn").addEventListener("click", () => addTab(component_item_clone, random_component_id));
    component_item_clone.querySelector(".remove_tab").addEventListener("click", (event) => removeTab(event));
    component_item_clone.querySelector(".update_tab_form").addEventListener("submit", (event) => submitUpdateTabDetails(event, random_component_id, random_tab_id));
    component_item_clone.querySelector(".update_tab_form .title_tab_input").addEventListener("blur", (event) => {
        let tab_title_data = event.target.value;

        submitUpdateTabDetails({is_title: true, tab_title_data}, random_component_id, random_tab_id);
    });
    component_item_clone.querySelector(".update_tab_form .tab_description_input").addEventListener("blur", (event) => {
        let tab_desc_data = event.target.value;

        submitUpdateTabDetails({is_title: false, tab_desc_data}, random_component_id, random_tab_id);
    });
    component_item_clone.querySelector(".tab_name").addEventListener("click", fetchSelectedTabDetails)
};

/* EVENTS */
document.getElementById("add_component").addEventListener("click", addComponentItem);