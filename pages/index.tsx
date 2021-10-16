import { GetServerSideProps, InferGetStaticPropsType } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import MaterialTable from 'material-table';
import axios from 'axios'
  
  
  export const getServerSideProps: GetServerSideProps = async () => {
    const api = process.env.API_URL
    const siteUrl = process.env.APP_URL + process.env.NEXT_PUBLIC_BASE_PATH
    const [
      { data },
      { data: kecamatan },
      { data: kelurahan },
      { data: pengampu },
      { data: status }
    ] = await Promise.all([
      axios.get(api),
      axios.get(api + '/referensi/kecamatan'),
      axios.get(api + '/referensi/kelurahan'),
      axios.get(api + '/referensi/pengampu'),
      axios.get(api + '/referensi/status'),
    ])
    return {
      props:{
        data,
        kecamatan,
        kelurahan,
        pengampu,
        status,
        siteUrl
      }
    }
  }
  
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  export const Home = ({ data,
    kecamatan,
    kelurahan,
    pengampu,
    status, }: InferGetStaticPropsType<typeof getServerSideProps>) => {
      return (
        <>
        <Head>
          <title>TANOS (Tampung dan Organisir Usulan)</title>
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/icon?family=Material+Icons"
            />
        </Head>
        <body>
        <div>
          <Image
            src="/assets/Tanos.jpeg"
            width={'176'}
            height={'84'}
            className="img-fluid space"
            alt=""
          />
        </div>
      <MaterialTable
        title=""
        columns={[
          { title: "KECAMATAN", field: "kecamatan", lookup:kecamatan },
          { title: "KELURAHAN", field: "kelurahan", lookup:kelurahan },
          { title: "RT", field: "rt" },
          { title: "RINCIAN ALAMAT", field: "rincian_alamat" },
          { title: "USULAN", field: "usulan" },
          { title: "KOEFISIEN", field: "koefisien" },
          { title: "PENGAMPU", field: "pengampu",lookup:pengampu },
          { title: "STATUS", field: "status",lookup:status },
        ]}
        data={data}
        options={{
          filtering: true,
          exportButton: true,
          pageSize:10,
          pageSizeOptions: [10, 50, data.length],
          headerStyle: {
            color: '#000',
            fontWeight: 'bold'
          }
        }}
        
        />
        </body>
      <style jsx>
        {`
          .space {
            margin:20px;
            padding:5px;
          }
          @font-face {
              font-family: Frutiger;
              src: url("assets/Frutiger.otf") format("opentype");
          }
          body { 
            font-family:'Frutiger',sans-serif;
            padding:5px;
          }
        `}
      </style>
      </>
)}

export default Home
