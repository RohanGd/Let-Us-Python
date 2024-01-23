<!-- <script context="module">
  export let outputText = "";
</script> -->

<script>
  import Sk from "skulpt";
  import CodeMirror from "svelte-codemirror-editor";
  import { oneDark } from "@codemirror/theme-one-dark";
  import { outputText } from "./stores";
  import { onMount } from "svelte";

  // import { EditorView } from "@codemirror/view";

  let value = "";
  function outf(text) {
    outputText.set(text.trim().toString());
    // var mypre = document.getElementById("output");
    // mypre.innerHTML = text.trim().toString();
  }

  function builtinRead(x) {
    if (
      Sk.builtinFiles === undefined ||
      Sk.builtinFiles["files"][x] === undefined
    )
      throw "File not found: '" + x + "'";
    return Sk.builtinFiles["files"][x];
  }

  // Here's everything you need to run a python program in skulpt
  // grab the code from your textarea
  // get a reference to your pre element for output
  // configure the output function
  // call Sk.importMainWithBody()
  function runit() {
    var prog = value;
    var mypre = document.getElementById("output");
    mypre.innerHTML = "";
    Sk.pre = "output";
    Sk.configure({ output: outf, read: builtinRead, __future__: Sk.python3 });
    (Sk.TurtleGraphics || (Sk.TurtleGraphics = {})).target = "mycanvas";
    var myPromise = Sk.misceval.asyncToPromise(function () {
      return Sk.importMainWithBody("<stdin>", false, prog, true);
    });
    value = "";
    return myPromise.then(
      function (mod) {
        console.log("success");
        return outputText;
      },
      function (err) {
        console.log(err.toString());
        return outputText;
      }
    );
  }
  onMount(() => {
    document.addEventListener("keydown", function (event) {
      if (
        event.ctrlKey &&
        (event.key === "c" ||
          event.key === "C" ||
          event.key === "v" ||
          event.key === "V")
      ) {
        event.preventDefault(); // Prevent Ctrl+C and Ctrl+V
      }
    });
  });
</script>

<div class="relative bottom-0 left-0 w-full h-1/3">
  <!-- <div class="h-[70vh]">hi</div> -->
  <CodeMirror
    bind:value
    theme={oneDark}
    styles={{
      "&": {
        width: "100%",
        height: "24vh",
      },
    }}
  />
  <button
    class=" absolute bottom-10 right-5 text-white z-10 bg-gray-800 rounded-md hover:bg-gray-700 px-4 py-2"
    type="button"
    on:click={runit}>Submit</button
  >
  <pre id="output" />
</div>
