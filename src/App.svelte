<script>
  import {onMount} from 'svelte'
  import Converter from "./lib/converter";
  import Footer from "./components/Footer.svelte";
  import Copy from "carbon-icons-svelte/lib/Copy.svelte";
  import Information from "carbon-icons-svelte/lib/Information.svelte";
  import {zipurl, unzipurl} from 'zipurl'
  import { readonly } from 'svelte/store';

  let fdsOutput = "";
  let fdsInput = "";
  let shareLink = ""
  let inputDisabled = ""

  function clickConvert() {
    const c = new Converter(fdsInput);
    fdsOutput = c.toString();
    console.log(c.fdsObject);
    document.getElementById('main-input').setAttribute('readonly', 'readonly')
    shareLink = location.protocol + '//' + location.host + location.pathname + "?data=" + zipurl(fdsInput)
  }

  function selectLink() {
    document.getElementById('share-link').focus()
    // @ts-ignore
    document.getElementById('share-link').select()
  }

  function copyContent() {
    navigator.clipboard.writeText(fdsOutput);
  }
  onMount(() => {
    const params = new URLSearchParams(window.location.search)
    const d = params.get('data')
    if (d) {
      try {
        fdsInput = String(unzipurl(d))
        clickConvert()
      } catch (error) {
        console.error(error)
      }
    }

  })
</script>

<main>
  <div class="container-top container">
    <a href="/"><h1>FDS Reader</h1></a>
    <div></div>
    <p style="color:var(--secondary); display:none" >
      <Information style="margin-bottom: 4px" size={32} />
      Der FDS Reader wird nur im Browser ausgeführt und speichert keine Daten.
    </p>
    
    <textarea
      id='main-input'
      placeholder="Inhalt der FDS-Datei hier einfügen..."
      rows={fdsOutput !== "" ? 3 : 6}
      bind:value={fdsInput}
      class="text-code"
    />
    <button style="display: {fdsOutput === '' ? 'block' : 'none'}" on:click={clickConvert} disabled={!Converter.validate(fdsInput)}>
      Konvertieren
    </button>
    


    
  </div>
  <div class="container container-bot">
    <article
      style="visibility: {fdsOutput !== '' ? 'visible' : 'hidden'};"
      class="text-code"
    >
      <button
        on:click={copyContent}
        class="copy-btn outline secondary icon-btn"
        data-tooltip="Text Kopieren" data-placement="left"><Copy size={20} /></button
      >
      {fdsOutput}

      <footer>
        <input 
    readonly 
    aria-readonly="true" 
    id='share-link' 
    type="text" 
    value={shareLink} 
    on:click={selectLink}
    style="visibility: {fdsOutput !== '' ? 'visible' : 'collapse'}" />
      </footer>

    </article>
    <div style="display: flex; max-width:100%">

        <p class='fds-info'  >
    <Information style="margin-bottom: 4px" size={24} />
    Der FDS Reader wird nur im Browser ausgeführt und speichert keinerlei Daten.
  </p>

    </div>
    

  </div>

  <Footer />
</main>

<style lang="css">
  .fds-info {
    color:var(--secondary); 
    display: block;
    margin: 0px auto;
    font-size: smaller;
    text-align: center;

  }
  .icon-btn {
    font-family: var(--font-family);
    width: 42px;
    height: 42px;
    padding: 0px;
  }
  .copy-btn {
    position: absolute;
    right: 36px;
    top: 66px;

  }
  #share-link {
    font-size: 0.95em;
    margin: 8px 0px;
    border-color: var(--primary);
  }

  @media screen and (max-width: 1200px) {
    .copy-btn {
      visibility: collapse;
    }
  }

  .container-top {
    max-width: 960px;
    padding: 2px 8px;
  }
  .container-bot {
    margin-top: -12px;
    max-width: 1800px;
    overflow-x: auto;
    position: relative;
    padding: 0px 8px;
  }

</style>
