export  const isActive = (history, path) => {
    if (history.location.pathname === path) {
        return { color: "#0278ae" };
    } else {
        return { color: "#17a2b2" };
    }
};