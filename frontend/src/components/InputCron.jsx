function InputCron() {

    return (
        <div>
            <label for="hs-inline-leading-pricing-select-label" class="block text-sm font-medium mb-2 dark:text-white">Update Interval</label>
            <div class="relative">
                <input type="text" id="hs-inline-leading-pricing-select-label" name="inline-add-on" class="py-3 px-4 pl-9 pr-20 block w-full border-gray-200 shadow-sm rounded-md text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 dark:bg-slate-900 dark:border-gray-700 dark:text-gray-400" placeholder="0.00"></input>
                <div class="absolute inset-y-0 left-0 flex items-center pointer-events-none z-20 pl-4">
                    <span class="text-gray-500">$</span>
                </div>
                <div class="absolute inset-y-0 right-0 flex items-center text-gray-500 pr-px">
                    <label for="hs-inline-leading-select-currency" class="sr-only">Currency</label>
                    <select id="hs-inline-leading-select-currency" name="hs-inline-leading-select-currency" class="block w-full border-transparent rounded-md focus:ring-blue-600 focus:border-blue-600 dark:bg-gray-800">
                        <option>USD</option>
                        <option>CAD</option>
                        <option>EUR</option>
                    </select>
                </div>
            </div>
        </div>);
}

export default InputCron;