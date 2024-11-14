import SearchWrapper from '@/components/Search/SearchWrapper';

const SearchPage = ({ searchParams }: { searchParams: { q: string } }) => {    
    return (
        <SearchWrapper searchParams={searchParams} />
    );
};

export default SearchPage;