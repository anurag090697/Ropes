// <div
                //   className='border w-full p-2 rounded-lg border-gray-300'
                //   key={idx}
                // >
                //   <div className='grid grid-cols-12 items-start'>
                //     <img
                //       className='rounded-full w-16 h-16 object-cover col-span-2'
                //       src={data.displaypicture}
                //       alt=''
                //     />
                //     <div className='col-span-9'>
                //       <h3>{data.name}</h3>
                //       <p>{ele.text}</p>
                //     </div>

                //     <div className='relative col-span-1'>
                //       {" "}
                //       <button
                //         onClick={() => setoptmenu(optmenu === idx ? null : idx)}
                //         className=''
                //       >
                //         <SlOptions />
                //       </button>
                //       <span
                //         className={`absolute bg-white top-4 left-0 text-black rounded-lg border border-gray-800 hover:underline p-1 ${
                //           optmenu === idx ? "" : "hidden"
                //         }`}
                //       >
                //         Report
                //       </span>
                //     </div>
                //   </div>
                //   <div className=''>
                //     <img
                //       src={ele.picture}
                //       alt=''
                //       className='my-2 rounded-md border'
                //     />
                //     <div className='flex gap-10 text-2xl items-center px-3 py-1'>
                //       <button
                //         className='flex items-center gap-2'
                //         onClick={() =>
                //           dispatch(
                //             likeUnlikePost({
                //               userId: data._id,
                //               postId: ele._id,
                //             })
                //           )
                //         }
                //       >
                //         {ele.likes.includes(data._id) ? (
                //           <span className='text-rose-600'>
                //             <FaHeart />
                //           </span>
                //         ) : (
                //           <FaRegHeart />
                //         )}{" "}
                //         <span>{ele.likes.length}</span>
                //       </button>
                //       <button
                //         className='flex items-center gap-2'
                //         onClick={() =>
                //           setcommentOpt(commentOpt === idx ? null : idx)
                //         }
                //       >
                //         <FaRegComment /> <span>{ele.comments.length}</span>
                //       </button>
                //       {/* <button>
                //         <MdOutlineRepeatOne />
                //       </button> */}
                //     </div>
                //     <div className={`${commentOpt === idx ? "" : "hidden"}`}>
                //       <div className='relative'>
                //         <input
                //           type='text'
                //           className='w-full text-wrap text-blue-700 rounded-md pr-14 py-1 px-3 h-fit'
                //           name='comment'
                //           value={newComment}
                //           onChange={(e) => setnewComment(e.currentTarget.value)}
                //         />{" "}
                //         <button
                //           onClick={() =>
                //             dispatch(
                //               addComment({
                //                 user,
                //                 text: newComment,
                //                 postId: ele._id,
                //               })
                //             )
                //           }
                //           className={`${
                //             commentOpt === idx && newComment ? "" : "hidden"
                //           } absolute top-0 right-0 bg-slate-700 py-1 px-3 rounded-r-md`}
                //         >
                //           Post
                //         </button>
                //       </div>
                //       {ele.comments.length > 0
                //         ? ele.comments.map((ele, idx) => {
                //             return (
                //               <div
                //                 key={idx}
                //                 className='flex items-center p-1 gap-1 justify-center border my-1 rounded-lg'
                //               >
                //                 <img
                //                   className='w-10 h-10 rounded-full'
                //                   src={ele.displaypicture}
                //                   alt=''
                //                 />{" "}
                //                 <div className='w-full'>
                //                   {" "}
                //                   <h3 className='text-lime-200'>
                //                     {ele.username}
                //                   </h3>
                //                   <p className='bg-gray-600 p-1 rounded-md w-full'>
                //                     {ele.text}
                //                   </p>
                //                 </div>
                //               </div>
                //             );
                //           })
                //         : ""}
                //     </div>
                //   </div>
                // </div>