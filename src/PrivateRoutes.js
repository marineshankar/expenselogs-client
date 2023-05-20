

export default function PrivateRoutes() {

    const history = useHistory();

    useEffect(() => {
        const token = localStorage.getItem("x-auth-token");
        if(!token) history.push("/login");
    });

    return (
        <Switch>
            <Route path="/contact"><Contact /></Route>
            <Route exact path="/settings"><Settings /></Route>
            <Route exact path="/bills"><Bills /></Route>
            <Route path="/bills/add"><AddBill /></Route>
            <Route path="/bills/edit/:id"><ModifyBill /></Route>
            <Route path="/"><Home /></Route>
        </Switch>
    );
}