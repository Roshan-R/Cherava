function NewHomepageElement(props) {
  return (
    <a href="/new">
      <div className="hover:cursor-pointer transition-all hover:scale-105 p-3 flex border-4 rounded-lg border-black border-dashed text-2xl self-center font-semibold">
        Create a new workflow
      </div>
    </a>
  );
}

export default NewHomepageElement;
