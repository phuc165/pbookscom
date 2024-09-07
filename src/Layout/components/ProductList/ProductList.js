import classNames from 'classnames/bind';
import styles from './Productlist.module.css';

import ProductCell from '../ProductCell/ProductCell';

const cx = classNames.bind(styles);
const products = [
    {
        productID: '1',
        title: 'Thanh Gươm Diệt Quỷ - Kimetsu No Yaiba - Tập 20 - Trái Tim Kiên Định Dẫn Lối',
        oldPrice: '25000',
        newPrice: '24000',
        img1: 'images/product/test_1.png',
        img2: 'images/product/test_1.png',
        img3: 'images/product/test_1.png',
        img4: 'images/product/test_1.png',
        rating: '4',
        description:
            '<p>Thanh Gươm Diệt Quỷ - Kimetsu No Yaiba - Tập 20: Trái Tim Kiên Định Dẫn Lối</p>\r\n<p>Nham trụ Himejima và Phong trụ Shinazugawa cùng đối đầu với Thượng huyền nhất. Trận chiến càng lúc càng khốc liệt, hai người đều đã xuất hiện vết bớt trên cơ thể. Nhưng dù đã cùng phối hợp tấn công, họ vẫn bị áp đảo trước sức mạnh khủng khiếp của Thượng huyền nhất. Genya đã hồi phục nhờ hấp thu được một phần của Thượng huyền nhất, nhưng liệu kết quả trận chiến sẽ ra sao…!?</p>\r\n<p>“Thanh gươm diệt quỷ” đang bước vào hồi gay cấn nhất!! Xin mời các bạn độc giả tiếp tục theo dõi Vol.20 nhé!!</p>',
        nxb: 'Nhà Xuất Bản Kim Đồng',
        author: 'Koyoharu Gotouge',
        age: '16',
        theLoai: 'Hành_động',
        productQty: '3',
        anHien: '1',
    },
    {
        productID: '2',
        title: 'Thanh Gươm Diệt Quỷ - Kimetsu No Yaiba - Tập 8 - Sức Mạnh Của Thượng Huyền - Sức Mạnh Của Trụ Cột',
        oldPrice: '25000',
        newPrice: '24000',
        img1: 'images/product/test_1.png',
        img2: 'images/product/test_1.png',
        img3: 'images/product/test_1.png',
        img4: 'images/product/test_1.png',
        rating: '5',
        description:
            '<p>Thanh Gươm Diệt Quỷ - Kimetsu No Yaiba - Tập 8: Sức Mạnh Của Thượng Huyền - Sức Mạnh Của Trụ Cột</p>\r\n<p>Tanjiro đã sử dụng Hỏa thần thần lạc - Bích La Thiên để chiến đấu với quỷ giấc mơ Enmu. Liệu trận chiến đã đến hồi kết!? Và bản chất của thứ xuất hiện trên cơ thể Tanjiro là gì? Cuối cùng, Viêm trụ Rengoku Kyojuro cũng đã hành động. Trước những lời từ một người mạnh, thứ mà Tanjiro thấy là….!?</p>\r\n<p>“Xin chào, lại là Gotouge đây! Mọi người có khỏe không? Sức khỏe không thể mua được bằng tiền, nên tôi cầu mong mọi người đều mạnh khỏe. Cảm ơn các bạn đã gửi tới tôi thật nhiều lời động viên, trà bánh và đồ handmade nữa! Ngày nào tôi cũng háo hức đến mức chảy cả máu cam kìa. Mỗi khi bị chảy máu cam tôi đều nhét giấy và đeo mặt nạ kín mít nên không sao đâu, các bạn đừng lo!” (KOYOHARU GOTOUGE)</p>',
        nxb: 'Nhà Xuất Bản Kim Đồng',
        author: 'Koyoharu Gotouge',
        age: '16',
        theLoai: 'Hành_động',
        productQty: '993',
        anHien: '1',
    },
    {
        productID: '3',
        title: 'My Hero Academia - Học Viện Siêu Anh Hùng - Tập 26 - Trời Cao Xanh Thẳm',
        oldPrice: '25000',
        newPrice: '24000',
        img1: 'images/product/test_1.png',
        img2: 'images/product/test_1.png',
        img3: 'images/product/test_1.png',
        img4: 'images/product/test_1.png',
        rating: '4',
        description:
            '<p>My Hero Academia - Học Viện Siêu Anh Hùng - Tập 26 - Trời Cao Xanh Thẳm</p>\r\n<p>Sau khi nhận được thông tin bí mật từ Hawks và bộ an ninh công cộng, ta mới phát hiện… hóa ra kì thực tập lần này là để biến các học sinh thành chiến lực hỗ trợ cho cuộc chiến của các Villain sắp tới…!?</p>\r\n<p>Được thôi, Siêu Anh hùng hạng nhất đương nhiệm này sẽ huấn luyện cả 3 đứa ra ngô ra khoai nhé!</p>\r\n<p>“Plus Ultra”!!</p>',
        nxb: 'Nhà Xuất Bản Kim Đồng',
        author: 'Ruyuha Kyouka',
        age: '11',
        theLoai: 'Hành_động',
        productQty: '997',
        anHien: '1',
    },
    {
        productID: '4',
        title: 'My Hero Academia - Học Viện Siêu Anh Hùng - Tập 21 - Lí Do Người Anh Hùng Trụ Vững',
        oldPrice: '25000',
        newPrice: '24000',
        img1: 'images/product/test_1.png',
        img2: 'images/product/test_1.png',
        img3: 'images/product/test_1.png',
        img4: 'images/product/test_1.png',
        rating: '4',
        description:
            '<p>My Hero Academia - Học Viện Siêu Anh Hùng - Tập 21: Lí Do Người Anh Hùng Trụ Vững (Tái Bản 2022)</p>\r\n<p>Nguy rồi! Lũ Nomu lại làm loạn trong thành phố! Ba của Todoroki đang dồn toàn bộ sức lực ngăn cản chúng! Còn Todoroki cũng đang rất sốt sắng! Nhưng tớ nghĩ là mọi thứ sẽ ổn thôi! Bởi Endeavor là Siêu anh hùng số 1 mà! Tụi tớ luôn tin tưởng và ủng hộ ông ấy! </p>\r\n<p>“Plus Ultra”!!</p>',
        nxb: 'Nhà Xuất Bản Kim Đồng',
        author: 'Ruyuha Kyouka',
        age: '11',
        theLoai: 'Hành_động',
        productQty: '997',
        anHien: '1',
    },
    {
        productID: '5',
        title: 'Dragon Ball - 7 Viên Ngọc Rồng - Tập 3 - Đại Hội Võ Thuật Khởi Tranh!',
        oldPrice: '25000',
        newPrice: '24000',
        img1: 'images/product/test_1.png',
        img2: 'images/product/test_1.png',
        img3: 'images/product/test_1.png',
        img4: 'images/product/test_1.png',
        rating: '4',
        description:
            '<p>Dragon Ball là bộ truyện tranh thiếu niên dài kì nổi tiếng của tác giả Toriyama Akira trên tuần san Weely Shonen Jump. Bộ truyện ra đời năm 1984 và kết thúc vào năm 1995 với tổng cộng 519 chương, chia thành 42 tập truyện rời do NXB Shueisha phát hành.</p>\r\n<p>Bộ truyện kể về một cậu bé đuôi khỉ tên là Son Goku sống một mình trong chốn rừng sâu. Cậu rất coi trọng viên ngọc kỉ vật quý giá ông nội để lại trước khi mất.</p>\r\n<p>Một ngày nọ, cậu vô tình gặp một cô gái kì lạ tên là Bulma đang trên đường tìm kiếm 7 viên ngọc rồng truyền thuyết. Bulma chỉ cho Son Goku thấy rằng, viên ngọc gia bảo của cậu chính là viên ngọc 4 sao, 1 trong 7 viên ngọc rồng mà cô đang tìm kiếm, còn rủ Son Goku tham gia phiêu lưu cùng với mình nữa. Chẳng mảy may suy nghĩ, Goku vui vẻ nhận lời và kể từ đó, cậu nhóc chính thức bước vào một hành trình vĩ đại, không đơn giản chỉ là tìm ngọc rồng nữa, mà là bảo vệ chúng khỏi những kẻ xấu xa mang dã tâm lớn như: Tập đoàn Red Ribbon, Đại Ma Vương Piccolo, Frieza Đại Đế, Cell Bọ Hung, Ma Buu...</p>\r\n<p>Dù đụng độ phải đối thủ mạnh hơn mình rất nhiều, Son Goku không hề nao núng, cậu luôn nỗ lực cải thiện sức mạnh của chính mình và coi kẻ thù giống như những thử thách thú vị cần vượt qua. Chính vì lí do đó mà xưa nay Son Goku vẫn luôn được độc giả xem như là biểu tượng của sự cố gắng không ngừng nghỉ.</p>\r\n<p>Suốt chặng đường trừ gian diệt ác ấy, Goku còn có những người thầy, người bạn sẵn sàng ở bên giúp đỡ, thậm chí vào sinh ra tử cùng cậu. Tác giả Toriyama Akira đã khẳng định một điều rằng: ta sẽ chẳng làm nên điều gì lớn lao nếu như ở bên không có những người bạn tốt. Triết lí: tình bạn – nỗ lực làm nên chiến thắng từ đó đã trở thành tôn chỉ của hầu hết những bộ truyện tranh thiếu niên sau này của Shonen Jump.</p>\r\n<p>Tuy Dragon Ball đã kết thúc nhưng sức hút của bộ truyện vẫn còn sôi sục cho tới tận ngày nay. Bên cạnh series 42 tập chính, Dragon Ball còn được tác giả Toriyama phát triển thành vũ trụ Dragon Ball thông qua các tác phẩm Anime, Movie, và mới đây là series Dragon Ball Super được NXB Kim Đồng mua bản quyền và phát hành gần như sát với Nhật Bản, mời quý vị độc giả đón đọc và ủng hộ.</p>',
        nxb: 'Nhà Xuất Bản Kim Đồng',
        author: 'Akira Toriyama',
        age: '16',
        theLoai: 'Hành_động',
        productQty: '1000',
        anHien: '1',
    },
    {
        productID: '6',
        title: 'Dragon Ball Super - Tập 6 - Hỡi Các Siêu Chiến Binh, Hãy Tập Hợp!',
        oldPrice: '25000',
        newPrice: '24000',
        img1: 'images/product/test_1.png',
        img2: 'images/product/test_1.png',
        img3: 'images/product/test_1.png',
        img4: 'images/product/test_1.png',
        rating: '5',
        description:
            '<p>Dragon Ball Super Tập 6: Hỡi Các Siêu Chiến Binh, Hãy Tập Hợp! (Tái Bản 2022)</p>\r\n<p>Giải đấu sức mạnh do Đấng Toàn Năng làm “chủ xị” đã chính thức khởi tranh!! Vòng loại do các Thần Hủy Diệt tiến hành cũng đã xong, luật lệ cũng đã được ấn định: ngoại trừ vũ trụ chiến thắng, những vũ trụ thua cuộc đều sẽ bị hủy diệt. Goku đã phải khổ công chạy đôn chạy đáo để chọn ra 10 chiến binh xứng đáng nhất tham gia giải đấu như thế nào?</p>',
        nxb: 'Nhà Xuất Bản Kim Đồng',
        author: 'Akira Toriyama',
        age: '16',
        theLoai: 'Hành_động',
        productQty: '1000',
        anHien: '1',
    },
    {
        productID: '7',
        title: 'One-Punch Man - Tập 1 - Chỉ Một Cú Đấm',
        oldPrice: '25000',
        newPrice: '24000',
        img1: 'images/product/test_1.png',
        img2: 'images/product/test_1.png',
        img3: 'images/product/test_1.png',
        img4: 'images/product/test_1.png',
        rating: '4',
        description:
            '<p>One-Punch Man - Tập 1: Chỉ Một Cú Đấm (Tái Bản 2022)</p>\r\n<p>Một đấm chết luôn! Người hùng Saitama quá mạnh, bất cứ ác nhân hay quái thú nào gặp anh cũng đều bị hạ gục dễ dàng chỉ sau một cú đấm! Truyền thuyết về người hùng lãnh đạm bắt đầu!!</p>',
        nxb: 'Nhà Xuất Bản Kim Đồng',
        author: 'One, Yusuke Murata',
        age: '16',
        theLoai: 'Hành_động',
        productQty: '1000',
        anHien: '1',
    },
    {
        productID: '8',
        title: 'One-Punch Man - Tập 19 - Tận Diệt Cải Thảo',
        oldPrice: '25000',
        newPrice: '24000',
        img1: 'images/product/test_1.png',
        img2: 'images/product/test_1.png',
        img3: 'images/product/test_1.png',
        img4: 'images/product/test_1.png',
        rating: '4',
        description:
            '<p>Người bạn nhí Tareo của Garo đã bị Hiệp hội Quái nhân bắt sống. Trong lúc đó, tụi Genos lại đang hùng hục... ăn lẩu tại nhà của Saitama. Garo đơn thân tiến vào sào huyệt của đám Quái nhân, còn Hiệp hội Anh hùng thì sôi sục kế hoạch giải cứu cho cậu ấm hách dịch Waganma...</p>',
        nxb: 'Nhà Xuất Bản Kim Đồng',
        author: 'One, Yusuke Murata',
        age: '16',
        theLoai: 'Hành_động',
        productQty: '996',
        anHien: '1',
    },
    {
        productID: '9',
        title: 'Chainsaw Man - Tập 1 - Bìa 2 Mặt - Tặng Kèm Lót Ly Giấy + Standee PVC',
        oldPrice: '45000',
        newPrice: '40000',
        img1: 'images/product/test_1.png',
        img2: 'images/product/test_1.png',
        img3: 'images/product/test_1.png',
        img4: 'images/product/test_1.png',
        rating: '5',
        description:
            '<p>Chainsaw Man - Tập 1</p>\r\n<p>Quà Tặng:</p>\r\n<p>- Lót Ly Giấy, Bìa Giấy Kraft</p>\r\n<p>- Riêng Tập 1 Có Thêm Bìa 2 Mặt, Standee PVC</p>\r\n<p>Câu chuyện của CHAINSAW MAN mô tả một thế giới nơi ma quỷ và con người cùng tồn tại, và trong đó con người có thể lập khế ước để đạt được sức mạnh của quỷ.</p>\r\n<p>Vì số nợ khổng lồ của cha để lại, nhân vật chính Denji cùng con quỷ nhỏ Pochita làm tất cả mọi công việc để có thể hoàn nợ. Sau một tai nạn, Denji bị giết, Pochita đã hòa làm một với Denji, giúp cậu hồi sinh và hóa thành “Quỷ cưa” hùng mạnh. Sau đó, Denji được Makima nhận vào tổ chức săn quỷ và hành trình diệt quỷ của Denji bắt đầu từ đây.</p>',
        nxb: 'Trẻ',
        author: 'Tatsuki Fujimoto',
        age: '18',
        theLoai: 'Hành_động',
        productQty: '1000',
        anHien: '1',
    },
    {
        productID: '10',
        title: 'Chainsaw Man - Tập 11 - Tặng Kèm Lót Ly + Card PVC',
        oldPrice: '50000',
        newPrice: '45000',
        img1: 'images/product/test_1.png',
        img2: 'images/product/test_1.png',
        img3: 'images/product/test_1.png',
        img4: 'images/product/test_1.png',
        rating: '5',
        description:
            '<p>Chainsaw Man - Tập 11</p>\r\n<p>Câu chuyện của Chainsaw Man mô tả một thế giới nơi ma quỷ và con người cùng tồn tại trên Trái đất, và trong đó con người có thể lập hiệp ước để đạt được sức mạnh của quỷ. </p>\r\n<p>Nhân vật chính là Denji, để hoàn trả số nợ khổng lồ của cha để lại, Denji cùng con quỷ nhỏ Pochita làm tất cả mọi công việc để có thể hoàn nợ. Sau một tai nạn, Denji bị giết, Pochita đã hòa làm một với Denji, giúp cậu hồi sinh và hóa thành “Quỷ cưa” hùng mạnh. Sau đó, Denji được Makima nhận vào tổ chức săn quỷ và hành trình diệt quỷ của Denji bắt đầu từ đây.</p>',
        nxb: 'Trẻ',
        author: 'Tatsuki Fujimoto',
        age: '18',
        theLoai: 'Hành_động',
        productQty: '999',
        anHien: '1',
    },
];
function ProductList() {
    return (
        <div className={cx('listContainer')}>
            {products.map((product) => (
                <ProductCell
                    key={product.productID}
                    title={product.title}
                    img={product.img1}
                    newPrice={product.newPrice}
                    oldPrice={product.oldPrice}
                />
            ))}
        </div>
    );
}

export default ProductList;
