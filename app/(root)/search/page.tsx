import SearchWrapper from '@/components/Search/SearchWrapper';

const SearchPage = ({ searchParams }: { searchParams: { q: string; page: number } }) => {
    return (
        <SearchWrapper searchParams={searchParams} />
    );
};

export default SearchPage;