import Head from "next/head";
import Image from "next/image";
import contentful from "../service/contentful";
import { documentToHtmlString } from "@contentful/rich-text-html-renderer";
import styles from "../styles/Home.module.css";

export default function Home({ bookCategory }) {
  console.log(bookCategory);
  return bookCategory.map((product) => (
    <div key={product.sys.id} style={{ float: "left", margin: "20px" }}>
      <div
        key={product.sys.id}
        style={{
          border: "2px solid black",
          width: "300px",
          borderRadius: "5px",
        }}
      >
        <figure>
          <img width="200" src={product.fields.cover.fields.file.url} />
          <h3>
            <span style={{ color: "#17a657" }}>نام اثر:</span>
            {product.fields.title}
          </h3>
          <h3>
            <span style={{ color: "#17a657" }}> نویسنده:</span>{" "}
            {product.fields.writer}
          </h3>
          <h3>
            <span style={{ color: "#17a657" }}> دسته:</span>{" "}
            {product.fields.genre}
          </h3>
          <hr />
          <h2>درباره کتاب</h2>
          <p
            style={{ textAlign: "justify", direction: "rtl" }}
            dangerouslySetInnerHTML={{
              __html: documentToHtmlString(product.fields.aboutTheBook),
            }}
          />
          <hr />
          <h2>خلاصه کتاب</h2>
          <p
            style={{ textAlign: "justify", direction: "rtl" }}
            dangerouslySetInnerHTML={{
              __html: documentToHtmlString(product.fields.overiview),
            }}
          />
          {/* {documentToHtmlString(product.fields.overiview)}</p> */}
        </figure>
        {/* <p>{</p> */}
      </div>
    </div>
  ));
}
export async function getServerSideProps() {
  const result = await contentful.getEntries({
    content_type: "bookCategory",
  });
  return { props: { bookCategory: result.items } };
}
