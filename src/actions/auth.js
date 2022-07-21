import cookie from "js-cookie";

export const setCookie = (key, value) => {
  if (process.browser) {
    cookie.set(key, value, {
      expires: 1,
    });
  }
};
export const removeCookie = (key) => {
  if (process.browser) {
    cookie.remove(key, {
      expires: 1,
    });
  }
};
export const getCookie = (key) => {
  if (process.browser) {
    return cookie.get(key);
  }
};
export const setLocalstorage = (key, value) => {
  if (process.browser) {
    localStorage.setItem(key, JSON.stringify(value));
  }
};
export const removeLocalstorage = (key) => {
  if (process.browser) {
    localStorage.removeItem(key);
  }
};

export const authentication = (admin, next) => {
  setCookie("token", admin.token);
  let user = { ...admin, token: undefined };
  setLocalstorage("user", user);
  next();
};

export const isAuth = () => {
  if (process.browser) {
    const cookieChecked = getCookie("token");

    if (cookieChecked) {
      if (localStorage.getItem("user")) {
        return JSON.parse(localStorage.getItem("user"));
      } else {
        return false;
      }
    } else {
      return false;
    }
  } else {
    return false;
  }
};
export const signout = (next) => {
  removeCookie("token");
  removeLocalstorage("user");
  next();
};
export const userSessionExpired = (error, history, sellerLogout) => {
  if (
    error.message == "jwt expired" ||
    error.message == "Invalid/Expired token, Login again"
  ) {
    if (history.location.pathname.includes("/admin")) {
      signout(() => {
        history.push({
          pathname: "/dashboard/admin/signin",
          state: "Your session is expired. please signin.",
        });
      });
    }
     else if (history.location.pathname.includes("/newSellers")) {
       signout(() => {
         history.push({
           pathname: "/dashboard/newSellers/signin",
           state: "Your session is expired. please signin.",
         });
       });
     } else {
       signout(async () => {
         await sellerLogout();
         history.push({
           pathname: "/dashboard/signin",
           state: "Your session is expired. please signin.",
         });
       });
     }
  } else {
    return;
  }
};
