import Head from "next/head";
import Message from "../components/Message";
import { useEffect, useState } from "react";
import { apiList } from "../pages/api";
import MsgCard from "../components/msgCard";
const Home = () => {
  const [datamsg, setDatamsg] = useState([]);
  const [selectItem, setselectItem] = useState(null);
  const [skip, setSkip] = useState(0);
  const [numOfMsg, setNumOfMsg] = useState(0);
  const [show, setShow] = useState(false);
  const [msgShow, setMsgShow] = useState(false);
 const take=12;

  const toggle = () => {
    setShow(!show);
  };

  const loadMore = async () => {
    setSkip(skip + 1);
    await apiList(skip + 1, take, (err, result) => {
      if (err) throw err;
      else {
        setDatamsg([...datamsg, ...result.results]);
      }
    });
  };
  const dynamicSearch = (e) => {
    setDatamsg(
      datamsg.filter((item) =>
        item.title.toLowerCase().includes(e.target.value.toLowerCase())
      )
    );
  };
  useEffect(() => {
    apiList(skip, take, (err, result) => {
      if (err) throw err;
      else {
        setNumOfMsg(result.count);
        setDatamsg(result.results);
        console.log(result.results);
      }
    });
  }, []);
  const filterData = (id) => {
    setDatamsg(datamsg.filter((items) => items.id !== id));
  };
  return (
    <>
      <Head>
        <title>Inbox</title>
        <meta name="description" content="Inbox page " />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="container">
        <div className="nav">
          <div className="messages">
            <div className="inbox">Inbox</div>
            <div className="blue">Recycle bin</div>
          </div>
          <div className="single blue">Single Message View</div>
        </div>

        <Message item={selectItem} onDelete={filterData} msgShow1={msgShow} />
        <div className="listContianer ">
        <div className="listHead">
            <div>
              Messages <span className="msgNum">{datamsg.length}</span> of Total
              ({numOfMsg})
            </div>
            <div className="search">
              <input
                className={`input${show}`}
                type="search"
                id="search"
                onChange={(e) => {
                  dynamicSearch(e);
                }}
              />
              <img src="/search.png" alt="search" onClick={toggle}></img>
            </div>
          </div>
          <div className="blog-list">
         
          <section className="container " >
        <div >    {datamsg.map((msg) => (
              <div key={msg.id}>
                <MsgCard
                  onPress={(item) => {
                    setselectItem(item);

                    setMsgShow(true);
                  }}
                  item={msg}
                />
              </div>
            ))}</div>
          </section>
          </div>
          {numOfMsg > datamsg.length && (
            <div className="listFoot" onClick={loadMore}>
              load more ...
            </div>
          )}
        </div>
      </div>
    </>
  );
};
export default Home;