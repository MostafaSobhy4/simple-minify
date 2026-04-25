/********************  GSAP ANIMATIONS ********************/

const tl = gsap.timeline();

tl.from(".header", {
    y: -50,
    opacity: 0,
    duration: 0.6
})

const btn = document.querySelector(".btn");

if (btn) {
    btn.addEventListener("mouseenter", () => {
        gsap.to(btn, {
            scale: 1.1,
            y: -4,
            boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
            duration: 0.3
        });
    });

    btn.addEventListener("mouseleave", () => {
        gsap.to(btn, {
            scale: 1,
            y: 0,
            boxShadow: "0 5px 10px rgba(0,0,0,0.1)",
            duration: 0.3
        });
    });
}

const navLinks = document.querySelectorAll(".nav_data a");

navLinks.forEach(link => {

    link.addEventListener("click", (e) => {

        const href = link.getAttribute("href");

        // لو anchor داخلي زي #menu
        if (href === "#menu") {
            return;
        }

        e.preventDefault();

        gsap.to("body", {
            opacity: 0,
            duration: 0.4,
            onComplete: () => {
                window.location.href = href;
            }
        });

    });

    link.addEventListener("mouseenter", () => {
        gsap.to(link, {
            scale: 1.1,
            color: "#ffcc00",
            duration: 0.3
        });
    });

    link.addEventListener("mouseleave", () => {
        gsap.to(link, {
            scale: 1,
            color: "#fff",
            duration: 0.3
        });
    });

});

const input = document.querySelectorAll("input");

input.forEach((input) => {
    input.addEventListener("focus", () => {
        gsap.to(input, { scale: 1.05, duration: 0.3 });
    });
});

input.forEach((input) => {
    input.addEventListener("blur", () => {
        gsap.to(input, { scale: 1, duration: 0.3 });
    });
});

gsap.from(".section", {
    opacity: 0,
    y: 80,
    duration: 0.8,
    stagger: 0.2,
    scrollTrigger: {
        trigger: ".section",
        start: "top 80%"
    }
});

/********************  GLOBAL FUNCTIONS  ********************/

function handleUserUI() {
    const user = document.querySelector(".user");
    if (!user) return;

    user.style.display = "none";

    const loggedInUser =
        sessionStorage.getItem("loggedInUser") ||
        localStorage.getItem("loggedInUser");

    if (loggedInUser) {
        const loginItem = document.querySelector('a[href="login.html"]')?.parentElement;        
        if (loginItem) loginItem.remove();

        user.style.display = "block";
        user.children[0].textContent = `Welcome, ${loggedInUser}`;
        user.children[0].style.color = "white";
    }
}


/********************  HOME PAGE  ********************/

function initHomePage() {

    gsap.from(".title", {
        opacity: 0,
        y: 50,
        duration: 1
    });

    gsap.from(".subtitle", {
        opacity: 0,
        y: 30,
        duration: 1,
        delay: 0.2
    });

    function handleAuthUI() {
        // Welcome To User
        let user = document.querySelector(".user");
        let logout_btn = document.querySelector(".logout");

        if (user) user.style.display = "none";

        if (logout_btn) logout_btn.style.display = "none";

        if (sessionStorage.getItem("loggedInUser") || localStorage.getItem("loggedInUser")) {
            let nav_data = document.querySelector(".nav_data");
            let loggedInUser = "";
            if (sessionStorage.getItem("loggedInUser")){
                loggedInUser = sessionStorage.getItem("loggedInUser");
            }
            else if (localStorage.getItem("loggedInUser")){
                loggedInUser = localStorage.getItem("loggedInUser");
            }
                
            
            if(nav_data.children.length > 0) {
                nav_data.removeChild(nav_data.children[nav_data.children.length - 1]);
            }
            
            user.style.display = "block";
            user.children[0].textContent = `Welcome, ${loggedInUser}`;
            user.children[0].style.color = "white";

            logout_btn.style.display = "block";

            logout_btn.addEventListener("click", (e) => {
                sessionStorage.removeItem("loggedInUser");
                localStorage.removeItem("loggedInUser");
                window.location.href = "login.html";
            })
            
        }
    }

    function handleOrders() {
        // Pop Order & Store Order Details
        let pop = document.querySelector(".ord");
        let ordDet = document.createElement("span");
        let orderAdd = document.querySelector(".orderAdd");
        let addButtonItem = document.querySelectorAll(".addItem");

        if (sessionStorage.getItem("loggedInUser") || localStorage.getItem("loggedInUser")) {

            let go2shop = document.querySelector(".go2shop");
            let it_name = document.createElement("p");
            let it_price = document.createElement("p");
            let it_Quantity = document.createElement("p");


            ordDet.appendChild(it_name);
            ordDet.appendChild(it_price);
            ordDet.appendChild(it_Quantity);

            go2shop.before(ordDet);
            go2shop.style.marginBottom = "5px";


            let counter;

            addButtonItem.forEach((butt) => {
                butt.onclick = function() {                    
                    it_name.textContent = this.parentElement.parentElement.children[1].textContent;
                    it_price.textContent = this.parentElement.parentElement.children[2].textContent;
                    it_Quantity.textContent = "Quantity: " + this.parentElement.parentElement.children[3].children[1].value;                    

                    orderAdd.style.display = "block";

                    orderAdd.style.animation = "none";
                    void orderAdd.offsetWidth;
                    orderAdd.style.animation = "pop 3s ease forwards";

                    clearTimeout(counter);

                    counter = setTimeout(() => {
                        orderAdd.style.display = "none";
                    }, 5000);
                    

                    let OrderDetails = {
                        it_name: it_name.textContent,
                        it_price: it_price.textContent,
                        it_Quantity: parseInt(it_Quantity.textContent.match(/\d+/)[0]),
                    };                    

                    let Orders = JSON.parse(localStorage.getItem(`Orders_${sessionStorage.getItem("loggedInUser")}`)) || [];
                    Orders.push(OrderDetails);
                    localStorage.setItem(`Orders_${sessionStorage.getItem("loggedInUser")}`, JSON.stringify(Orders));

                }
            })

            const cart = document.createElement("a");
            cart.href = "cart.html";
            cart.className = "cartlogo";

            const icon = document.createElement("i");
            icon.className = "fa-solid fa-cart-shopping";

            cart.appendChild(icon);

            document.body.appendChild(cart);
        }


        else {
            let counter;
            let must = document.createElement("p");
            let go2login = document.createElement("a");
            go2login.textContent = "Press Here To Login First";
            orderAdd.appendChild(must);
            orderAdd.appendChild(go2login);
            go2login.href = "login.html";
            go2login.style.display = "block";

            addButtonItem.forEach((butt) => {
                butt.onclick = function() {
                    must.textContent = "Please login first to add orders.";

                    orderAdd.style.display = "block";

                    orderAdd.style.animation = "none";
                    void orderAdd.offsetWidth;
                    orderAdd.style.animation = "pop 3s ease forwards";

                    clearTimeout(counter);

                    counter = setTimeout(() => {
                        orderAdd.style.display = "none";
                    }, 5000);
                }
            });
            pop.remove();
        }

    }

    handleAuthUI();
    handleOrders();
}


/********************  CART PAGE  ********************/

function initCartPage() {
    let username = sessionStorage.getItem("loggedInUser");
    let cart = document.querySelector(".cart-page .container .cart-container .cart-content");
    let orders = JSON.parse(localStorage.getItem(`Orders_${username}`)) || [];

    let ordUl = document.createElement("ul");
    ordUl.classList.add("ordUl");
    ordUl.style.listStyle = "decimal";

    let totalDiv = document.createElement("div");
    totalDiv.style.marginTop = "25px";
    totalDiv.style.fontWeight = "bold";
    totalDiv.style.marginRight = "15px";

    let buttonsDiv = document.createElement("div");
    buttonsDiv.classList.add("Buttons");
    buttonsDiv.style.cssText = "margin-top: 10px;";

    function renderOrders() {
        cart.innerHTML = "";

        if (orders.length === 0) {
            let emptyMessage = document.createElement("p");
            emptyMessage.textContent = "سلة المشتريات فارغه.";
            emptyMessage.style.fontSize = "20px";
            emptyMessage.style.marginRight = "15px";
            cart.appendChild(emptyMessage);
            return;
        }

        let totalPrice = 0;
        ordUl.innerHTML = "";
        buttonsDiv.innerHTML = "";

        orders.forEach((order, i) => {
            let ordLi = document.createElement("li");

            ordLi.textContent = `${order.it_name} - ${order.it_price} - العدد: ${order.it_Quantity}`;

            let delItem = document.createElement("button");
            delItem.classList.add("delItem");
            delItem.textContent = "Delete This Item";

            delItem.onclick = function () {
                handleDeleteItem(i);
            };

            ordLi.appendChild(delItem);
            ordUl.appendChild(ordLi);

            totalPrice += parseFloat(order.it_price) * order.it_Quantity;
        });

        totalDiv.textContent = `الإجمالي: ${totalPrice} EGP`;

        let checkoutBtn = document.createElement("button");
        checkoutBtn.textContent = "إتمام الطلب";
        checkoutBtn.style.cssText = "padding: 5px 10px;";
        checkoutBtn.onclick = handleCheckout;

        let clearBtn = document.createElement("button");
        clearBtn.textContent = "إفراغ السلة";
        clearBtn.style.cssText = "margin-top: 10px; padding: 5px 10px;";
        clearBtn.onclick = handleClearCart;

        buttonsDiv.appendChild(clearBtn);
        buttonsDiv.appendChild(checkoutBtn);

        cart.appendChild(ordUl);
        cart.appendChild(totalDiv);
        cart.appendChild(buttonsDiv);
    }

    function handleDeleteItem(i) {
        let updatedOrders = JSON.parse(localStorage.getItem(`Orders_${username}`)) || [];

        let deletedItem = updatedOrders.splice(i, 1);

        let price = parseFloat(deletedItem[0].it_price);
        let qty = deletedItem[0].it_Quantity;

        localStorage.setItem(`Orders_${username}`, JSON.stringify(updatedOrders));

        orders = updatedOrders;

        renderOrders();
    }

    function handleCheckout() {
        alert("تم إرسال طلبك بنجاح!");
        localStorage.removeItem(`Orders_${username}`);
        location.reload();
    }

    function handleClearCart() {
        localStorage.removeItem(`Orders_${username}`);
        location.reload();
    }

    renderOrders();
}


/********************  LOGIN PAGE  ********************/

function initLoginPage() {
    let accounts = JSON.parse(localStorage.getItem("accounts")) || [];

    let username = document.querySelector("#log-username");
    let password = document.querySelector("#log-password");

    let loginForm = document.querySelector("#login-form");
    let pass_msg = document.querySelector("#pass-msg");

    let login_pass = document.querySelector("#log-password");
    const toggle_password = document.getElementById("toggle-password");

    function togglePassword() {
        // show / hide password

        toggle_password.addEventListener("click", () => {
            toggle_password.classList.toggle("fa-eye-slash");
            toggle_password.classList.toggle("fa-eye");
            login_pass.type = login_pass.type === "password" ? "text" : "password";
        });
    }

    function handleLogin() {
        loginForm.addEventListener("submit", (e) => {
            e.preventDefault();

            pass_msg.textContent = "";

            sessionStorage.removeItem("loggedInUser");
            localStorage.removeItem("loggedInUser");

            let loggedIn = false;
            let radio = document.querySelector('.sLog');

            for (let i = 0; i < accounts.length; i++) {
                if (
                    accounts[i]["username"] === username.value &&
                    accounts[i]["password"] === password.value
                ) {
                    loggedIn = true;
                    userName = accounts[i]["firstname"];

                    if (radio.checked)
                        localStorage.setItem("loggedInUser", accounts[i]["firstname"]);
                    else
                        sessionStorage.setItem("loggedInUser", accounts[i]["firstname"]);

                    break;
                }
            }

            if (loggedIn) {
                alert("You have successfully logged in, welcome back " + userName + "!");
                window.location.href = "index.html";
            } else {
                pass_msg.style.marginTop = "15px";
                pass_msg.textContent = "Username or password is incorrect.";
            }
        });
    }

    togglePassword();
    handleLogin();
}


/********************  SIGNUP PAGE  ********************/

function initSignupPage() {

    let signup_form = document.getElementById("signup-form");

    let Fname = document.getElementById("firstname");
    let Uname = document.getElementById("username");
    let email = document.getElementById("email");
    let password = document.getElementById("signup-pass");
    let Confpassword = document.getElementById("confirm-pass");

    let Fname_error = document.getElementById("FnameError");
    let Uname_error = document.getElementById("UnameError");
    let email_error = document.getElementById("emailError");
    let password_error = document.getElementById("passError");
    let Confpassword_error = document.getElementById("confpassError");

    const toggle_password = document.getElementById("toggle-password");
    const toggle_Confpasswordword = document.getElementById("toggle-confirm-password");

    let usernamePattern = /^[a-zA-Z0-9_]{3,}$/;
    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let passwordPattern = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;

    function togglePassword() {
        // show password

        toggle_password.addEventListener("click", () => {
            toggle_password.classList.toggle("fa-eye-slash");
            toggle_password.classList.toggle("fa-eye");
            password.type = password.type === "password" ? "text" : "password";
        });

        toggle_Confpasswordword.addEventListener("click", () => {
            toggle_Confpasswordword.classList.toggle("fa-eye-slash");
            toggle_Confpasswordword.classList.toggle("fa-eye");
            Confpassword.type = Confpassword.type === "password" ? "text" : "password";
        });
    }

    function createAccount() {
        // create account

        sessionStorage.removeItem("loggedInUser");

        let accounts = JSON.parse(localStorage.getItem("accounts")) || [];

        let usernameExists = accounts.some(acc => acc.username === Uname.value);

        Fname_error.textContent = "";
        Uname_error.textContent = "";
        email_error.textContent = "";
        password_error.textContent = "";
        Confpassword_error.textContent = "";

        let hasError = false;

        if (Fname.value.length < 3) {
            Fname_error.textContent = "First name must be longer than 2 characters";
            hasError = true;
        }

        else if (!usernamePattern.test(Uname.value)) {
            Uname_error.textContent = "Username must be valid";
            hasError = true;
        }

        else if (usernameExists) {
            Uname_error.textContent = "Username already exists!";
            hasError = true;
        }

        else if (!emailPattern.test(email.value)) {
            email_error.textContent = "Invalid email format";
            hasError = true;
        }

        else if (!passwordPattern.test(password.value)) {
            password_error.textContent = "Password must be at least 8 characters, include uppercase, number, and special character Like [!@#$%^&*].";
            hasError = true;
        }

        if (password.value !== Confpassword.value) {
            Confpassword_error.textContent = "Passwords do not match.";
            hasError = true;
        }

        if (hasError) return;

        let accountData = {
            firstname: Fname.value,
            username: Uname.value,
            email: email.value,
            password: password.value
        };

        accounts.push(accountData);
        localStorage.setItem("accounts", JSON.stringify(accounts));

        signup_form.reset();

        sessionStorage.setItem("loggedInUser", accountData.firstname);

        alert("Account created successfully!");
        window.location.href = "index.html";
    }

    togglePassword();

    signup_form.addEventListener('submit', function (e) {
        e.preventDefault();
        createAccount();
    });
}


/********************  STATIC PAGES  ********************/

function initStaticPages() {
    let user = document.querySelector(".user");
    user.style.display = "none";

    if (sessionStorage.getItem("loggedInUser") || localStorage.getItem("loggedInUser")) {        
        user.style.display = "block";
        user.children[0].textContent = `Welcome, ${sessionStorage.getItem("loggedInUser") || localStorage.getItem("loggedInUser")}`;
        user.children[0].style.color = "white";
    }
    handleUserUI();
}


/******************** 🚀 APP INIT  ********************/

document.addEventListener("DOMContentLoaded", () => {
    // Global UI
    handleUserUI();

    if (document.querySelector(".home")) {
        initHomePage();
    }

    else if (document.querySelector(".cart-page")) {
        initCartPage();
    }

    else if (document.querySelector(".login")) {
        initLoginPage();
    }

    else if (document.querySelector(".signup")) {
        initSignupPage();
    }

    else if (
        document.querySelector(".about") ||
        document.querySelector(".contactus-page") ||
        document.querySelector(".branches-pages")
    ) {
        initStaticPages();
    }

});