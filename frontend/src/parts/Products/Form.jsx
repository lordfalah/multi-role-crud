const Form = ({
  onForm,
  onChanges,
  handleImageChange,
  image = "",
  name = "",
  price = "",
  method = "",
}) => {
  return (
    <div className="w-full flex justify-center items-center">
      <form
        onSubmit={onForm}
        method={method}
        encType="multipart/form-data"
        className="bg-white shadow-md rounded px-8 py-8 flex justify-center flex-col h-fit w-fit"
      >
        <div className="-mx-3 md:flex mb-6">
          <div className="md:w-1/2 px-3 mb-6 md:mb-0">
            <label
              className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
              htmlFor="grid-first-name"
            >
              Name Product
            </label>
            <input
              className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3"
              id="grid-first-name"
              type="text"
              name="name"
              placeholder="Jane"
              onChange={onChanges}
              value={name}
              required
              autoComplete="off"
            />
            <p className="text-red text-xs italic">
              Please fill out this field.
            </p>
          </div>
          <div className="md:w-1/2 px-3">
            <label
              className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
              htmlFor="price"
            >
              PRICE
            </label>
            <input
              className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4"
              id="price"
              type="number"
              name="price"
              placeholder="xxxxx"
              onChange={onChanges}
              value={price}
              required
              autoComplete="off"
            />
          </div>
        </div>
        <div className="-mx-3 md:flex ">
          <div className="md:w-full px-3">
            <label
              className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
              htmlFor="image"
            >
              Image
            </label>
            <input
              // eslint-disable-next-line react/no-unknown-property
              after={`${image ? image?.name : "No file chosen"}`}
              className="block relative text-transparent text-opacity-0 text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100 after:absolute after:content-[attr(after)] after:text-slate-500 after:left-[124.5px] after:top-1/2 after:-translate-y-1/2 w-fit"
              id="image"
              type="file"
              placeholder="xxxxx"
              onChange={handleImageChange}
            />
            <p className="text-grey-dark text-xs italic mt-2">
              Maximal size file is 5mb
            </p>
          </div>
        </div>

        <button
          type="submit"
          className="bg-slate-500 text-white w-fit mt-8 rounded-full px-5 py-2  "
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Form;
