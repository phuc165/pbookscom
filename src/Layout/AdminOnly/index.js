function AdminOnly({ children }) {
    return (
        <div>
            <div className="container">
                <div className="content">{children}</div>
            </div>
        </div>
    );
}

export default AdminOnly;
