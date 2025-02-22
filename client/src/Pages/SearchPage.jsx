import { useEffect, useState } from "react";
import CartLoading from "../Companents/CartLoading";
import axiosToastError from "../utility/AxiosToastError";
import { Axios } from "../utility/axios";
import summaryApi from "../Config/SummaryApi";
import CartProduct from "../Companents/CartProduct";
import InfiniteScroll from "react-infinite-scroll-component";
import { useLocation } from "react-router-dom";
import NoneData from "../Companents/NoneData";

const SearchPage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const loadingArrayCard = new Array(10).fill(null);
  const params = useLocation();
  const searchText = params?.search ? params.search.slice(3) : "";

  const fetchData = async (reset = false, newPage = 1) => {
    if (!searchText.trim()) return;

    try {
      setLoading(true);
      const res = await Axios({
        ...summaryApi.searchProduct,
        data: { search: searchText, page: newPage },
      });

      if (res.data.success) {
        setData(reset ? res.data.data : (prev) => [...prev, ...res.data.data]);
        setTotalPage(res.data.totalPage);
      }
    } catch (error) {
      axiosToastError(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!searchText.trim()) {
      setData([]);
      setPage(1);
      setTotalPage(1);
      setLoading(false);
      return;
    }

    setLoading(true);
    fetchData(true, 1);
  }, [searchText]);

  useEffect(() => {
    if (page > 1) {
      fetchData(false, page);
    }
  }, [page]);

  const handleFetchMore = () => {
    if (page < totalPage) {
      setPage((prev) => prev + 1);
    }
  };

  return (
    <section className="p-4 bg-white">
      <div className="min-h-[78vh]">
        <p className="font-semibold">Search Results: {data.length}</p>

        <InfiniteScroll
          dataLength={data.length}
          next={handleFetchMore}
          hasMore={page < totalPage}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 py-4 gap-1">
            {loading &&
              data.length === 0 &&
              loadingArrayCard.map((_, index) => <CartLoading key={index} />)}

            {data.map((p) => (
              <CartProduct data={p} key={p.id} />
            ))}
          </div>
        </InfiniteScroll>

        {!loading && data.length === 0 && <NoneData />}
      </div>
    </section>
  );
};

export default SearchPage;
