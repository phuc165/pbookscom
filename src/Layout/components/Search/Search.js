function Search() {
    const [searchQuery, setSearchQuery] = useState('');
    const nameMatch = product.title ? product.title.toLowerCase().includes(searchQuery.toLowerCase()) : false;
    return <h1>tìm</h1>;
}

export default Search;
