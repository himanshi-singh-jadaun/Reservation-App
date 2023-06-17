import "./featured.css";
import useFetch from "../../hooks/useFetch.js";

const Featured = () => {
    // this useFetch hook is custom one (i.e made one)
    const { data, loading, error } = useFetch("/hotels/countByCity?cities=berlin,madrid,london");

    return (
        <div className="featured">
            {loading ? ("Loading please wait") : (
            <>
            <div className="featuredItem">
                <img
                    src="https://images.unsplash.com/photo-1599946347332-130cd0a4c9e1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&h=500&q=80"
                    alt=""
                    className="featuredImg"
                />
                <div className="featuredTitles">
                    <h1>Berlin</h1>
                    <h2>{data[0]} Properties</h2>
                </div>
            </div>
                <div className="featuredItem">
                    <img
                        src="https://images.unsplash.com/photo-1539037116277-4db20889f2d4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&h=500&q=80"
                        alt=""
                        className="featuredImg"
                    />
                    <div className="featuredTitles">
                        <h1>Madrid</h1>
                        <h2>{data[1]} Properties</h2>
                    </div>
                </div>
                <div className="featuredItem">
                    <img
                        src="https://plus.unsplash.com/premium_photo-1661962726504-fa8f464a1bb8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&h=500&q=80"
                        alt=""
                        className="featuredImg"
                    />
                    <div className="featuredTitles">
                        <h1>London</h1>
                        <h2>{data[2]} Properties</h2>
                    </div>
                </div>
            </>
            )}
        </div>
    )
}

export default Featured;