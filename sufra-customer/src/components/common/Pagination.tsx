
interface PaginationProps {
    currentPage: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPrevPage: boolean;
    onNext: () => void;
    onPrev: () => void;
    onPageChange: (page: number) => void;
}

const Pagination = ({currentPage , totalPages ,hasNextPage , hasPrevPage , onNext , onPrev , onPageChange}:PaginationProps) => {

    const totalPagesArray = Array.from({ length: totalPages }, (_, i) => i + 1);

    return (
        <nav className="flex justify-center my-3">
            <ul className="flex items-center gap-1">
                <li>
                    <a id="prev" onClick={hasPrevPage? onPrev:undefined} className={`flex items-center justify-center size-5 mx-2 ${hasPrevPage? "bg-[#B68D67] hover:bg-[#ffc38b]": "bg-[#142A29] hover:bg-[#1c3b3a]" }  text-amber-50 border border-[#2f4f4d] transition rotate-45`}>
                    </a>
                </li>

                {totalPagesArray.map((page, i) => (
                    <li key={i}>
                        <div onClick={page === currentPage ? undefined : () => onPageChange(page)} className={`px-4 py-2 rounded-md border border-[#2f4f4d] transition cursor-pointer ${
                            page === currentPage
                                ? "bg-[#ffbf8a] text-[#585858] font-semibold"
                                : "bg-[#142A29] text-amber-50 hover:bg-[#1c3b3a]"
                            }`}>

                            {page}

                        </div>
                    </li>
                ))}

                <li>
                    <a id="next" onClick={hasNextPage? onNext : undefined} className={`flex items-center justify-center size-5 mx-2 ${hasNextPage? "bg-[#B68D67] hover:bg-[#ffc38b]": "bg-[#142A29] hover:bg-[#1c3b3a]" }  text-amber-50 border border-[#2f4f4d]  transition rotate-45`}>
                    </a>
                </li>
            </ul>

        </nav>
    );
};

export default Pagination;
