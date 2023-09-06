const Form = ({ onForm, onChanges, form, role, setRole, method }) => {
  return (
    <form
      onSubmit={onForm}
      method={method}
      className="bg-white shadow-md rounded px-8 pt-6 pb-8 flex justify-center flex-col h-fit w-fit"
    >
      <div className="-mx-3 md:flex mb-6">
        <div className="md:w-1/2 px-3 mb-6 md:mb-0">
          <label
            className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
            htmlFor="full-name"
          >
            Full Name
          </label>
          <input
            className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3"
            id="full-name"
            type="text"
            placeholder="Jane"
            name="name"
            onChange={onChanges}
            value={form.name}
          />
          <p className="text-red text-xs italic">Please fill out this field.</p>
        </div>
        <div className="md:w-1/2 px-3">
          <label
            className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4"
            id="email"
            type="email"
            placeholder="Doe"
            name="email"
            onChange={onChanges}
            value={form.email}
          />
        </div>
      </div>
      <div className="-mx-3 md:flex mb-6">
        <div className="md:w-1/2 px-3 mb-6 md:mb-0">
          <label
            className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-red rounded py-3 px-4 mb-3"
            id="password"
            type="password"
            placeholder="****"
            name="password"
            onChange={onChanges}
            value={form.password}
          />
          <p className="text-red text-xs italic">Please fill out this field.</p>
        </div>
        <div className="md:w-1/2 px-3">
          <label
            className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
            htmlFor="confirmpass"
          >
            Confirm Password
          </label>
          <input
            className="appearance-none block w-full bg-grey-lighter text-grey-darker border border-grey-lighter rounded py-3 px-4"
            id="confirmpass"
            type="password"
            placeholder="****"
            name="confirmPassword"
            onChange={onChanges}
            value={form.confirmPassword}
          />
        </div>
      </div>
      <div className="-mx-3 md:flex mb-2">
        <div className="md:w-1/2 px-3">
          <label
            className="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-2"
            htmlFor="grid-state"
          >
            State
          </label>
          <div className="relative z-10">
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="block appearance-none w-full bg-grey-lighter border border-grey-lighter text-grey-darker py-3 px-4 pr-8 rounded"
              id="grid-state"
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
            <div className="pointer-events-none absolute pin-y pin-r flex items-center px-2 text-grey-darker">
              <svg
                className="h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <button
        type="submit"
        className="bg-slate-500 text-white w-fit mt-8 rounded-full px-5 py-2"
      >
        Submit
      </button>
    </form>
  );
};

export default Form;
