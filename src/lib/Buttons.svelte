<script>
    import {hora, max, started} from "./state.js";
    let startButton;
    let set30Button;
    let set45Button;
    let set60Button;
    async function setTimer(mins) {
        let now = $hora
        if (now.getHours() < 3) {
            now.setMinutes(now.getMinutes() + mins);
            now = new Date(now);
            hora.set(now)
        } else {
            max.set(true)
            await new Promise(r => setTimeout(r, 4000));
            max.set(false)
        }

    }
    function reset(){
        pausar()
        let now = $hora
        now.setSeconds(0);
        now.setMinutes(45);
        now.setHours(0);
        now = new Date(now);
        hora.set(now)


    }
    function disable(bool){
        startButton.disabled=bool;
        set30Button.disabled=bool;
        set45Button.disabled=bool;
        set60Button.disabled=bool;


    }
    async function empezar() {

        started.set(true)
        disable(true)
        while ($started) {
            let now = $hora
            now.setSeconds(now.getSeconds() - 1);
            now = new Date(now);
            hora.set(now)
            await new Promise(r => setTimeout(r, 1000));
        }
    }
    function pausar(){
        disable(false)
        started.set(false)
    }


</script>

<div>
    <button bind:this={startButton} on:click={empezar}>
        Start
    </button>
    <button on:click={pausar}>
        Stop
    </button>
    <button on:click={reset}>
        Reset
    </button>

    <div>
        Minutes:
        <button bind:this={set30Button} on:click={()=>setTimer(30)}>
            30
        </button>
        <button bind:this={set60Button} on:click={()=>setTimer(60)}>
            60
        </button>
        <button bind:this={set45Button} on:click={()=>setTimer(45)}>
            45
        </button>

    </div>
    {#if ($max)}
        Has llegado al máximo de minutos disponibles.

    {/if}
</div>
