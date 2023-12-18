import Header from "../../Layout/Header";
import { useState, useEffect } from "react";
import CoHuuService from "../../Service/CoHuuService";
import Paginations from "../../support/Paginations";
// import Cabin_edit from "./Cabin_edit";
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify";
import ImPort from "../../support/ImPort";
import GiaoVienService from "../../Service/GiaoVienService";
import CoHuu_Filter from "./CoHuu_Filter";
import CoHuu_Edit from "./CoHuu_Edit";
import Loading from "../../Layout/Loading";
import StudentService from "../../Service/StudentService";
import { format } from 'date-fns';
import SessionService from "../../Service/SessionService";
const CheckError = () => {
    const [listerror, setlisterror] = useState([])
    const [lists, setLists] = useState([])
    const [listerrorshow, setlisterrorShow] = useState([])
    const [listch, setlistch] = useState([])
    const [text, settext] = useState('')
    const [date, setdate] = useState()
    const [head, sethead] = useState([])
    const [Loadings, setloadings] = useState(false)
    const [Data, setData] = useState([])
    const [listflag, setlistflag] = useState([])
    // const [listflag, setlistflag] = useState([])
    const [listgv, setlistgv] = useState([])
    const [objfilter, setobjfilter] = useState({})
    let header = [["Mã phiên học", "Mã hoc viên", "Tên học viên", "Khoá học", "Tên giáo viên", "Số xe", "Thời gian học", "Thời gian bắt đầu", "Thời gian kết thúc", "Lỗi vi phạm"]]
    const users = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
    let navitive = useNavigate()
    let flag = 0
    function my_date(date_string) {
        var date_components = date_string.split("G");

        return date_components[1]
    }
    const listcarbyrank = [{ soxe: '83A06874', rank: 'B2' },
    { soxe: '83A06947', rank: 'B2' },
    { soxe: '83C07185', rank: 'B2' },
    { soxe: '83A07008', rank: 'B2' },
    { soxe: '83A05492', rank: 'B2' },
    { soxe: '83C02596', rank: 'B2' },
    { soxe: '83A04116', rank: 'B2' },
    { soxe: '83A06921', rank: 'B2' },
    { soxe: '83A07014', rank: 'B2' },
    { soxe: '83C08737', rank: 'B2' },
    { soxe: '83C03921', rank: 'B2' },
    { soxe: '83A07957', rank: 'B2' },
    { soxe: '83A08720', rank: 'B2' },
    { soxe: '83A07924', rank: 'B2' },
    { soxe: '83A07042', rank: 'B2' },
    { soxe: '83A07679', rank: 'B2' },
    { soxe: '83A03111', rank: 'B2' },
    { soxe: '83C01840', rank: 'B2' },
    { soxe: '83A09174', rank: 'B2' },
    { soxe: '83A09726', rank: 'B2' },
    { soxe: '83A10195', rank: 'B2' },
    { soxe: '83A12570', rank: 'B2' },
    { soxe: '83A07027', rank: 'B2' },
    { soxe: '83A11211', rank: 'B2' },
    { soxe: '83A11257', rank: 'B2' },
    { soxe: '83A11160', rank: 'B2' },
    { soxe: '83A11476', rank: 'B2' },
    { soxe: '83A11504', rank: 'B2' },
    { soxe: '83A08157', rank: 'B2' },
    { soxe: '83A11673', rank: 'B2' },
    { soxe: '83A06754', rank: 'B2' },
    { soxe: '83A11731', rank: 'B2' },
    { soxe: '83A11814', rank: 'B2' },
    { soxe: '83A11433', rank: 'B2' },
    { soxe: '83A11695', rank: 'B2' },
    { soxe: '83A12123', rank: 'B2' },
    { soxe: '83C09617', rank: 'B2' },
    { soxe: '83A09569', rank: 'B2' },
    { soxe: '83A12671', rank: 'B2' },
    { soxe: '83A12680', rank: 'B2' },
    { soxe: '83C09670', rank: 'B2' },
    { soxe: '83A12872', rank: 'B2' },
    { soxe: '83A13008', rank: 'B2' },
    { soxe: '83A13038', rank: 'B2' },
    { soxe: '83A05668', rank: 'B2' },
    { soxe: '83A15332', rank: 'B2' },
    { soxe: '83A06544', rank: 'B2' },
    { soxe: '83A10556', rank: 'B2' },
    { soxe: '83A07246', rank: 'B2' },
    { soxe: '83A12801', rank: 'B2' },
    { soxe: '83A06195', rank: 'B2' },
    { soxe: '95A05328', rank: 'B2' },
    { soxe: '83A09137', rank: 'B2' },
    { soxe: '83A09804', rank: 'B2' },
    { soxe: '83A09901', rank: 'B2' },
    { soxe: '64A03444', rank: 'B2' },
    { soxe: '64A08967', rank: 'B2' },
    { soxe: '83A10695', rank: 'B2' },
    { soxe: '65A04845', rank: 'B2' },
    { soxe: '63A15252', rank: 'B2' },
    { soxe: '65A27131', rank: 'B2' },
    { soxe: '64A10696', rank: 'B2' },
    { soxe: '83A11674', rank: 'B2' },
    { soxe: '83A07222', rank: 'B2' },
    { soxe: '63A17929', rank: 'B2' },
    { soxe: '95A02691', rank: 'B2' },
    { soxe: '83A12090', rank: 'B2' },
    { soxe: '83A00276', rank: 'B2' },
    { soxe: '83A12637', rank: 'B2' },
    { soxe: '67A19639', rank: 'B2' },
    { soxe: '83A12474', rank: 'B2' },
    { soxe: '94A02508', rank: 'B2' },
    { soxe: '68A23242', rank: 'B2' },
    { soxe: '83A12202', rank: 'B2' },
    { soxe: '83A04125', rank: 'B2' },
    { soxe: '95A07653', rank: 'B2' },
    { soxe: '83A14052', rank: 'B2' },
    { soxe: '64A12963', rank: 'B2' },
    { soxe: '83C10747', rank: 'B2' },
    { soxe: '83C10707', rank: 'B2' },
    { soxe: '83A05299', rank: 'B2' },
    { soxe: '83C10150', rank: 'B2' },
    { soxe: '69A09444', rank: 'B2' },
    { soxe: '94A03138', rank: 'B2' },
    { soxe: '64A13617', rank: 'B2' },
    { soxe: '83A08414', rank: 'B2' },
    { soxe: '83A03493', rank: 'B2' },
    { soxe: '95A07762', rank: 'B2' },
    { soxe: '83A15441', rank: 'B2' },
    { soxe: '84A05385', rank: 'B2' },
    { soxe: '64A10855', rank: 'B2' },
    { soxe: '83A11263', rank: 'B11' },
    { soxe: '66A16413', rank: 'B2' },
    { soxe: '83C07636', rank: 'C' },
    { soxe: '83C06395', rank: 'C' },
    { soxe: '83C06423', rank: 'C' },
    { soxe: '83C06304', rank: 'C' },
    { soxe: '83C08002', rank: 'C' },
    { soxe: '83C07864', rank: 'C' },
    { soxe: '83C08579', rank: 'C' },
    { soxe: '83C08617', rank: 'C' },
    { soxe: '83C08622', rank: 'C' },
    { soxe: '83C08977', rank: 'C' },
    { soxe: '83C08925', rank: 'C' },
    { soxe: '83C09133', rank: 'C' },
    { soxe: '83C09162', rank: 'C' },
    { soxe: '83C09163', rank: 'C' },
    { soxe: '83C09085', rank: 'C' },
    { soxe: '83C08974', rank: 'C' },
    { soxe: '83C09142', rank: 'C' },
    { soxe: '83C09174', rank: 'C' },
    { soxe: '83C09081', rank: 'C' },
    { soxe: '83C09096', rank: 'C' },
    { soxe: '83C09223', rank: 'C' },
    { soxe: '83C09618', rank: 'C' },
    { soxe: '83C09798', rank: 'C' },
    { soxe: '83C09818', rank: 'C' },
    { soxe: '83C09867', rank: 'C' },
    { soxe: '83C09791', rank: 'C' },
    { soxe: '83C09977', rank: 'C' },
    { soxe: '83C09723', rank: 'C' },
    { soxe: '83C09923', rank: 'C' },
    { soxe: '83C09933', rank: 'C' },
    { soxe: '83C09790', rank: 'C' },
    { soxe: '83C09853', rank: 'C' },
    { soxe: '83C09820', rank: 'C' },
    { soxe: '83C10133', rank: 'C' },
    { soxe: '83C10110', rank: 'C' },
    { soxe: '83C10112', rank: 'C' },
    { soxe: '83C10064', rank: 'C' },
    { soxe: '83C10207', rank: 'C' },
    { soxe: '83C09667', rank: 'C' },
    { soxe: '83C09687', rank: 'C' },
    { soxe: '83C09891', rank: 'C' },
    { soxe: '83C09789', rank: 'C' },
    { soxe: '83C10622', rank: 'C' },
    { soxe: '83C10730', rank: 'C' },
    { soxe: '83C10740', rank: 'C' },
    { soxe: '83C10617', rank: 'C' },
    { soxe: '83C11076', rank: 'C' },
    { soxe: '83C11093', rank: 'C' },
    { soxe: '95C06378', rank: 'C' },
    { soxe: '83B01086', rank: 'D' },
    { soxe: '83B00874', rank: 'E' },
    { soxe: '83C10158', rank: 'FC' },
    { soxe: '83C10216', rank: 'FC' },]
    const setDatas = (list) => {
        let listdata = [
        ]
        list.map((item, index) => {
            let e = { ngay: item.ngay, giaovien: item.giaovien, lotrinh: item.lotrinh, sokmngay: item.sokmngay, sokmdem: item.sokmdem, tongkm: Number(item.sokmdem) + Number(item.sokmngay) }

            listdata.push(e)
        })
        setData(listdata)
    }
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
    const ExcelDateToJSDate = (dates) => {
        let date = dates.split("/")

        let day = date[0];
        let month = date[1];

        let year = date[2];
        return (year + '-' + month + '-' + day)
    }
    const convertnumbertotime = (e) => {

        let number = e.split("h")
        return { hour: Number(number[0]), min: Number(number[1]) }
    }
    const checkteacherError = (lists, listteachers) => {
        let listerrors = []
        listteachers.map((item, index) => {
            let listteachs = lists.filter(i => i.tengiaovien == item.tengiaovien).sort((a, b) => new Date(a.ngay) - new Date(b.ngay))

            listteachs.map((teachItem, i) => {
                if (i + 1 < listteachs.length) {

                    if (new Date(teachItem.kt).getTime() > new Date(listteachs[i + 1].ngay).getTime()) {

                        let index = listerrors.filter(e => e.code == teachItem.code)
                        let flag = teachItem
                        flag.error = "Trùng tên giáo viên"

                        listerrors.push(flag)
                        let flags = listteachs[i + 1]
                        flags.error = "Trùng tên giáo viên"
                        listerrors.push(flags)
                    }

                }

            })
        })

        return listerrors
    }
    const checkCarError = (list, listcar) => {
        let listerror = []
        listcar.map((item, index) => {
            let listcheckcar = list.filter(i => i.soxe == item.soxe).sort((a, b) => new Date(a.ngay) - new Date(b.ngay))

            listcheckcar.map((Cartem, i) => {
                if (i + 1 < listcheckcar.length) {

                    if (new Date(Cartem.kt).getTime() > new Date(listcheckcar[i + 1].ngay).getTime()) {
                        let index = listerror.filter(e => e.code == Cartem.code)
                        Cartem.error = "Trùng xe"
                        if (index == -1)
                            listerror.push(Cartem)
                        listcheckcar[i + 1].error = "Trùng xe"
                        listerror.push(listcheckcar[i + 1])
                    }

                }

            })
        })

        return listerror
    }
    const getdata = (e) => {
        console.log(e)
        setData(e)
        let listerrorrank = []
        let list = []
        let listcar = []
        let liststudent = []
        let listteacher = []
        let listerrorranks = []
        e.map((item, index) => {
            console.log(item)
            let itemsave = { code: item.maphien, mahocvien: item.mahocvien, tenhocvien: item.tenhocvien, khoahoc: item.khoahoc, tengiaovien: item.tengiaovien, soxe: item.soxe, thoigian: item.thoigian, ngay: item.ngay, kt: '', error: '' }

            let rank = item.khoahoc.substring((item.khoahoc.length) - 2, (item.khoahoc.length)) + ''
            rank = my_date(item.khoahoc).trim()
            let ranks = listcarbyrank.filter(e => e.soxe == item.soxe)
            if (ranks[0] && ranks[0].rank != rank) {
                console.log(item, item.khoahoc)
                let flag = itemsave
                flag.error = "Sai hạng xe"
                listerrorrank.push(flag)
            }
            listerrorranks = listerrorrank

            let time = convertnumbertotime(item.thoigian)
            let newDateObj = new Date();
            let date = format(new Date((ExcelDateToJSDate(item.ngay.substring(0, 10)) + ' ' + item.ngay.substring(11, 16))), 'yyyy-MM-dd HH:mm');


            let kt = new Date(date)
            kt.setTime(kt.getTime() + (time.hour * 3600 * 1000) + (time.min * 60 * 1000));
            itemsave.kt = format(kt, 'yyyy-MM-dd HH:mm');
            itemsave.ngay = date
            if (listcar.length < 0 || listcar.findIndex(item => item.soxe == itemsave.soxe) == -1)
                listcar.push(itemsave)
            if (liststudent.length < 0 || liststudent.findIndex(item => item.mahocvien == itemsave.mahocvien) == -1)
                liststudent.push(itemsave)
            if (listteacher.length < 0 || listteacher.findIndex(item => item.tengiaovien == itemsave.tengiaovien) == -1)
                listteacher.push(itemsave)

            list.push(itemsave)

        })



        checkteacherError(list, listteacher).map((item, ine) => {
            listerrorranks.push(item)
        })
        checkCarError(list, listcar).map((item, ine) => {
            listerrorranks.push(item)
        })
        let listtest = checkteacherError(list, listteacher)
        console.log(listtest)
        setlisterrorShow(listerrorranks)
        setData(listerrorranks)
        // console.log()

    }

    useEffect(() => {

        let heads = ["stt", "maphien", "tile", "khoahoc", "mahocvien", "tenhocvien", "tengiaovien", "soxe", 'ngay', "thoigian", "quangduong", "thoigians"]


        sethead(heads)
        if ((!users || users.roleId != 1) && flag == 0) {
            flag = 1
            navitive("/")
            toast.error("Truy cập không được phép")
        }
        else {
            const date = new Date()
            let list = []
            const ngayhoc = date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + (date.getDate() - 1)
            CoHuuService.getlist()
                .then(
                    res => {
                        console.log(res.data, ngayhoc)
                        list = res.data.filter(item => new Date(item.ngay) >= new Date(ngayhoc))
                        console.log(list)
                        GiaoVienService.getlist()
                            .then(ress => {
                                setlistch(res.data.sort((a, b) => new Date(b.ngay) - new Date(a.ngay)))
                                setlistgv(ress.data)
                                setloadings(true)
                                setDatas(list.sort((a, b) => new Date(b.ngay) - new Date(a.ngay)))
                                setlisterror([...list.sort((a, b) => new Date(b.ngay) - new Date(a.ngay))])

                            }).catch(err => {
                                console.log(err)
                            })


                    }

                ).catch(err => {
                    console.log(err)
                })


        }


    }, [listflag])
    const changetext = (e) => {
        const objs = objfilter
        objs.condition = ''
        setobjfilter(objs)
        settext(e.target.value)
        let list = []
        if (date) {
            list = listch.filter(item => item.ngay == date)
        }
        else
            list = listch
        if (e.target.value)
            list = list.filter(item => (xoa_dau(item.giaovien.toLowerCase())).includes(xoa_dau(e.target.value.toLowerCase())) == true)
        setlisterror(list.sort((a, b) => new Date(b.ngay) - new Date(a.ngay)))
        setDatas(list.sort((a, b) => new Date(b.ngay) - new Date(a.ngay)))



    }

    const getlist = (e) => {
        setLists(e)


    }

    const filter = (obj) => {
        // console.log(obj.list)

        setlisterror([...obj.list])
        setDatas([...obj.list])
        setobjfilter(obj)
    }
    const edit = () => {

        CoHuuService.getlist().then(res => {
            let list = []
            if (objfilter.date) {
                list = res.data.filter(i => i.ngay = objfilter.date)
            }
            else
                list = res.data
            setlisterror(list.sort((a, b) => new Date(b.ngay) - new Date(a.ngay)))
            setDatas(list.sort((a, b) => new Date(b.ngay) - new Date(a.ngay)))
            setlistch(res.data.sort((a, b) => new Date(b.ngay) - new Date(a.ngay)))
        })
    }
    return (
        <>
            <Header />
            <main id="cabin_list" className="main">
                <div className="container">
                    {

                        Loadings ?

                            <>

                                <div className='row mt-5  '>
                                    <div className="col col-md-4">
                                        <input type="text" className="form-control  ms-2 " id="teacher" onChange={(e) => changetext(e)} value={text} placeholder="Nhập nội dung tìm kiếm" />
                                    </div>
                                    <CoHuu_Filter filter={filter} listch={listch} listgv={listgv} />
                                    <div className="col col-md-4">
                                        <ImPort getdata={getdata} header={header} head={head} data={Data} row={4} name={"DanhSach_ThongKe_DAT_" + new Date().getFullYear() + "_" + new Date().getMonth() + "_" + new Date().getDate()} />
                                    </div>


                                </div>
                                <table className="table">
                                    <thead className="thead-dark">
                                        <tr>
                                            <th>STT</th>

                                            <th scope="col">Mã phiên học</th>

                                            <th scope="col">Mã học viên</th>

                                            <th scope="col">Khoá học</th>



                                            <th scope="col">Tên giáo viên</th>
                                            <th scope="col">Số xe</th>
                                            <th scope="col">Thời gian bắt đầu</th>
                                            <th scope="col">Thời gian kết thúc </th>

                                            <th>Lỗi vi phạm</th>

                                        </tr>
                                    </thead>
                                    <tbody>
                                        {listerrorshow && listerrorshow.map((item, index) => {
                                            return (
                                                <tr className="alert" role="alert" key={index}>
                                                    <th scope="row">{index + 1}</th>

                                                    <td>
                                                        {item.code}
                                                    </td>

                                                    <td>
                                                        {item.mahocvien
                                                        }
                                                    </td>

                                                    <td>
                                                        {item.khoahoc}
                                                    </td>


                                                    <td>
                                                        {item.tengiaovien}
                                                    </td>

                                                    <td>
                                                        {item.soxe}
                                                    </td>
                                                    <td>
                                                        {item.ngay}
                                                    </td>
                                                    <td>
                                                        {item.kt}
                                                    </td>

                                                    <td >
                                                        {item.error}
                                                    </td>

                                                </tr>

                                            )
                                        })
                                        }








                                    </tbody>
                                </table>
                                <Paginations itemsPerPage={20} list={listerror} getlist={getlist} />
                            </> : <Loading />
                    }

                </div>
            </main>
        </>
    )
}
export default CheckError;