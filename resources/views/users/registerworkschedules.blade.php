@extends('admin.layout.master')
@section('title', __('Register Work Schedules') )
@section('module', __('Register Work Schedules'))
@section('content')
    <div class="row">
        <div class="col-xl-12">
            <div class="m-portlet">
                <div class="m-portlet__body">
                    <div class="m-section">
                        <div class="m-section__content">
                            <table class="table">
                                <thead>
                                    <tr>
                                        <th>
                                            <div class="form-group m-form__group row">
                                                {!! Form::label('label', __('Day'), ['class' => 'col-form-label col-lg-3']) !!}
                                            </div>
                                        </th>
                                        <th>
                                            <div class="form-group m-form__group row">
                                                {!! Form::label('label', __('Day of Week'), ['class' => 'col-form-label col-lg-8']) !!}
                                            </div>
                                        <th>
                                            <div class="form-group m-form__group row">
                                                {!! Form::label('label', __('Shift'), ['class' => 'col-form-label col-md-6 text-center']) !!}
                                            <div class="col-md-6">
                                            {!! Form::select('shift', [config('site.shift.off') => __('Off'), config('site.shift.all') => __('All day'), config('site.shift.morning') => __('Morning'), config('site.shift.afternoon') => __('Afternoon') ], null, ['class' => 'form-control', 'id'=> 'select_shift']) !!}
                                            </div>
                                            </div>
                                        </th>
                                        <th>
                                            <div class="form-group m-form__group row">
                                                {!! Form::label('label', __('Location'), ['class' => 'col-form-label col-lg-6 text-center']) !!}
                                            <div class="col-lg-6">
                                                {!! Form::select('location_id', [config('site.default_location') => __('--Choose--')] + $locations, null, ['class' => 'form-control', 'id' => 'select_location']) !!}
                                            </div>
                                            </div>
                                        </th>
                                    </tr>
                                </thead>
                                {!! Form::open(['url' => route('workschedule'), 'method' => 'post' , 'id' => 'add_form' , 'enctype' => 'multipart/form-data']) !!}
                                <tbody>
                                    @foreach($dates as $day)
                                    <tr
                                    @isset($day['weekend'])
                                        class="bg-secondary text-dark"
                                    @endisset
                                    >
                                        <th scope="row">{{ $day['format'] }}</th>
                                        <td>{{ $day['day'] }}</td>
                                        <td>
                                            @if(!isset($day['weekend']))
                                            {!! Form::select('shift[' . $day['date']  .  ']', [config('site.shift.off') => __('Off'), config('site.shift.all') => __('All day'), config('site.shift.morning') => __('Morning'), config('site.shift.afternoon') => __('Afternoon') ], $data[$day['date']] ?? null, ['class' => 'form-control tar', 'id' => 'sl_shift']) !!}
                                            @endif
                                        </td>
                                        <td>
                                            @if(!isset($day['weekend']))
                                            {!! Form::select('location[' . $day['date']  .  ']', [config('site.default_location') => __('--Choose--')] + $locations, $dataLocation[$day['date']] ?? null, ['class' => 'form-control target', 'id' => 'sl_location']) !!}
                                            @endif
                                        </td>
                                    </tr>
                                    @endforeach
                                </tbody>
                            </table>
                            <div class="m-form m-form--fit m-form--label-align-right">
                                {!! Form::submit(__('Save') . '!', ['class' => 'btn m-btn--pill    btn-primary btn-lg m-btn m-btn--custom']) !!}
                            </div>
                            {!! Form::close() !!}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
@endsection

@section('js')
<script type="text/javascript">
$( '#select_location' ).change(function() {
    var all_value = $(this).val();
    
    $( '.target' ).each(function() {
        $(this).val(all_value);
    });
});
$( '#select_shift' ).change(function() {
    var value = $(this).val();
    
    $( '.tar' ).each(function() {
        $(this).val(value);
    });
});
</script>
@endsection
