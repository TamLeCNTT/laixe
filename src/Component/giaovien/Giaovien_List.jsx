import Header from "../../Layout/Header";
import { useState, useEffect } from "react";
import GiaoVienService from "../../Service/GiaoVienService";
import './Giaovien.scss'
import Paginations from "../../support/Paginations";
// import Cabin_edit from "./Cabin_edit";
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify";
import ImPort from "../../support/ImPort";
import GiaoVien_Edit from "./GiaoVien_Edit";
import GiaoVien_Add from "./GiaoVien_Add";
import Loading from "../../Layout/Loading";
const Giaovien_List = () => {
    const [listgiaovien, setlistgiaovien] = useState([])
    const [lists, setLists] = useState([])
    const [listcb, setlistcb] = useState([])
    const [text, settext] = useState()
    const [date, setdate] = useState()
    const [head, sethead] = useState([])
    const [Data, setData] = useState([])
    const [load, setload] = useState(false)
    const users = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
    let navitive = useNavigate()
    let flag = 0
    const xoa_dau = (str) => {
        str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
        str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
        str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
        str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
        str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
        str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
        str = str.replace(/đ/g, "d");
        str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
        str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
        str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
        str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
        str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
        str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
        str = str.replace(/Đ/g, "D");
        return str;
    }

    const getdata = (e) => {


        toast.success("Đọc file thành công")
        console.log(e)


        // console.log(e.filter(item => new Date(item.thoigianbd).getHours() > 18))
        console.log(e.filter(item => item.soxe == "83C10207"))
        console.log(e.filter(item => item.soxe == "83C10207").reduce((a, v) => (a = a + Number(v.quangduong)), 0))
        e.filter(item => item.soxe == "83C10207").map((items, index) => {
            console.log(new Date(items.thoigianbd).getHours())
        })
        console.log(e.filter(item => item.soxe == "83C10207" && new Date(item.thoigianbd).getHours() >= 18).reduce((a, v) => (a = a + Number(v.quangduong)), 0))

    }
    useEffect(() => {
        let heads = ["name", "soxe"]
        sethead(heads)
        if ((!users || users.roleId != 1) && flag == 0) {
            flag = 1
            navitive("/")
            toast.error("Truy cập không được phép")
        }
        else {
            setload(false)
            GiaoVienService.getlist().then(
                res => {
                    setlistgiaovien(res.data)
                    setlistcb(res.data)
                    setload(true)
                }
            )
        }


    }, [])
    const changetext = (e) => {
        settext(e.target.value)
        let list = []
        if (date) {
            list = listcb.filter(item => item.ngay == date)
        }
        else
            list = listcb
        console.log(list)
        if (e.target.value)
            list = list.filter(item => (xoa_dau(item.name.toLowerCase())).includes(xoa_dau(e.target.value.toLowerCase())) == true || (item.soxe + '').includes(e.target.value) == true)
        setlistgiaovien(list)



    }

    const getlist = (e) => {
        setLists(e)


    }
    const xoa = (e) => {
        let ok = window.confirm("Bạn có chắc chắn muốn xoá?")
        if (ok)
            GiaoVienService.delete(e).then(
                res => {

                    toast.success("Xoá giáo viên thành công")
                    setlistgiaovien(listgiaovien.filter(item => item.giaovienId != e))
                    setlistcb(listcb.filter(item => item.giaovienId != e))
                }
            )
    }
    const save = () => {
        GiaoVienService.getlist().then(
            res => {

                let list = []
                if (!text) {
                    list = res.data
                }
                else list = res.data.filter(item => (xoa_dau(item.name.toLowerCase())).includes(xoa_dau(text.toLowerCase())) == true || (item.soxe + '').includes(text) == true)

                setlistgiaovien(list)
                setlistcb(res.data)
            }
        )
    }
    return (
        <>
            <Header />
            <main id="cabin_list" className="main">
                <div className="container">
                    {
                        load ?
                            <>
                                <div className='row mt-5  '>
                                    <div className="col col-md-4">
                                        <input type="text" className="form-control  ms-2 " id="teacher" onChange={(e) => changetext(e)} value={text} placeholder="Nhập nội dung tìm kiếm" />
                                    </div>
                                    {/* <div className="col col-md-6">
                        <input type="date" className="form-control w-50 ms-2 " id="teacher" onChange={(e) => changedate(e)} value={date} placeholder="Nhập nội dung tìm kiếm" />
                    </div> */}
                                    <div className="col col-md-2">
                                        <GiaoVien_Add save={save} />
                                        {/* <ImPort getdata={getdata} head={head} data={Data} /> */}
                                    </div>


                                </div>
                                <table className="table">
                                    <thead className="thead-dark table-head">
                                        <tr>
                                            <th>STT</th>
                                            <th scope="col">Tên giáo viên</th>
                                            <th scope="col">Số xe</th>

                                            <th>Quản lý</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            lists && lists.map((item, index) => {
                                                return (
                                                    <tr className="alert" role="alert" key={index}>
                                                        <td scope="row">{index + 1}</td>
                                                        <td>
                                                            {item.name}
                                                        </td>

                                                        <td>
                                                            {item.soxe}
                                                        </td>
                                                        <td className="manage">
                                                            <a href="#" className="close" data-dismiss="alert" aria-label="Close" onClick={() => xoa(item.giaovienId)}>
                                                                <span aria-hidden="true"><i className="fa fa-close"></i></span>
                                                            </a>
                                                            <GiaoVien_Edit id={item.giaovienId} save={save} />
                                                        </td>

                                                    </tr>

                                                )
                                            })
                                        }








                                    </tbody>
                                </table>
                                <Paginations itemsPerPage={15} list={listgiaovien} getlist={getlist} />
                            </> :

                            <Loading />
                    }
                </div>
            </main>

        </>
    )
}
export default Giaovien_List;